#include <iostream>
#include <SQLiteCpp/SQLiteCpp.h>
#include <iomanip>
#include <sstream>
#include "crow.h"

std::string generateToken(const std::string& username, const std::string& password) {
    std::string combined = username + ":" + password;
    
    std::stringstream ss;
    ss << "Basic " << crow::utility::base64encode(combined, combined.size());
    return ss.str();
}

int main() {
    try {
        SQLite::Database db("main.db3", SQLite::OPEN_READWRITE | SQLite::OPEN_CREATE);
        std::cout << "SQLite database file '" << db.getFilename().c_str() << "' opened successfully\n";

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

        CROW_ROUTE(app, "/initialize")
        ([&db] (const crow::request& req) {
            std::string token = req.get_header_value("Authorization");

            std::string credentials = token.substr(6);
            std::string d_credentials = crow::utility::base64decode(credentials, credentials.size());

            size_t found = d_credentials.find(':');
            std::string username = d_credentials.substr(0, found);
            std::string password = d_credentials.substr(found + 1);

            SQLite::Statement query(db, "SELECT COUNT(*) FROM users WHERE username = ? AND password = ?");
            query.bind(1, username);
            query.bind(2, password);
            if(query.executeStep()) {
                int count = query.getColumn(0).getInt();
                if(count == 0)
                    return crow::response(403);
            }

            // Set the latest WebSocket ID in the database.

            return crow::response(200);
        });

        // Missing Routes to Retrieve latest messages, send message, a possible websocket implementation using Crow

        app.port(8080).multithreaded().run();
    } catch (std::exception& e) {
        std::cout << "SQLite exception: " << e.what() << std::endl;
        return -1;
    }

    return 0;
}