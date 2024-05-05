#include <iostream>
#include <SQLiteCpp/SQLiteCpp.h>
#include <iomanip>
#include <sstream>
#include "crow.h"

class Connection {
public:
    Connection(int userId, crow::websocket::connection* user) : UserId(std::move(userId)), User(std::move(user)) { }
    int UserId;
    crow::websocket::connection* User;
};

std::vector<Connection> connections;

std::string generateToken(const std::string& username, const std::string& password) {
    std::string combined = username + ":" + password;
    
    std::stringstream ss;
    ss << "Basic " << crow::utility::base64encode(combined, combined.size());
    return ss.str();
}

void initiateConnection(SQLite::Database& db, crow::json::rvalue data, crow::websocket::connection* conn) {
    if(!data.has("token"))
        return;

    std::string token = static_cast<std::string>(data["token"]);
	std::string credentials = crow::utility::base64decode(token, token.size());

    size_t found = credentials.find(':');
	std::string username = credentials.substr(0, found);
	std::string password = credentials.substr(found + 1);

	SQLite::Statement query(db, "SELECT id FROM users WHERE username = ? AND password = ?");
	query.bind(1, username);
	query.bind(2, password);

	if(query.executeStep()) {
        Connection connection(query.getColumn(0).getInt(), conn);
        connections.push_back(connection);
    }
}

void sendMessage(crow::json::rvalue data) {
    int recipientId = 0;
    if(data["recipientId"].t() == crow::json::type::Number)
        recipientId = static_cast<int>(data["recipientId"]);

    crow::json::wvalue response;
    response["message"] = data["message"];

    for (auto& c : connections) {
        CROW_LOG_ERROR << c.UserId << "\n";
        if(c.UserId == recipientId && c.User) {
            CROW_LOG_ERROR << "SENDING";
            c.User->send_text(response.dump());
        }
    }
}

int main() {
    try {
        SQLite::Database db("main.db3", SQLite::OPEN_READWRITE | SQLite::OPEN_CREATE);
        db.exec("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT NOT NULL, password TEXT NOT NULL)");

        crow::SimpleApp app;
        app.loglevel(crow::LogLevel::Warning);

        CROW_ROUTE(app, "/health")
        ([] () {
            return "Healthy";
        });

        CROW_ROUTE(app, "/register")
        .methods("POST"_method)
        ([&db] (const crow::request& req) {
            auto json = crow::json::load(req.body);
            if(!json) {
                return crow::response(400);
            }

            std::string username = json["username"].s();
            std::string password = json["password"].s();

            SQLite::Statement query(db, "SELECT COUNT(*) FROM users WHERE username = ?");
            query.bind(1, username);
            if(query.executeStep()) {
                int count = query.getColumn(0).getInt();
                if(count != 0) {
                    crow::json::wvalue response;
                    response["message"] = "Username is already taken";
                    return crow::response(response);
                }
            }

            SQLite::Statement insertQuery(db, "INSERT INTO users (username, password) VALUES (?, ?)");
            insertQuery.bind(1, username);
            insertQuery.bind(2, password); // Ideally, we should encrypt the password.
            insertQuery.exec();

            std::string token = generateToken(username, password);
            crow::json::wvalue response;
            response["token"] = token;

            return crow::response(response);
        });

        CROW_WEBSOCKET_ROUTE(app, "/ws")
        .onclose([&](crow::websocket::connection& conn, const std::string& reason) { 
            
        })
        .onmessage([&db](crow::websocket::connection& conn, const std::string& data, bool isBinary) {
            CROW_LOG_CRITICAL << data;
            auto dataJson = crow::json::load(data);
            if(!dataJson)
                return;

            if(dataJson["__TYPE__"] == "subscribe") {
                initiateConnection(db, dataJson, &conn);
            } else if(dataJson["__TYPE__"] == "message") {
                sendMessage(dataJson);
            }
        });

        app.port(8080).multithreaded().run();
    } catch (std::exception& e) {
        std::cout << "SQLite exception: " << e.what() << std::endl;
        return -1;
    }

    return 0;
}