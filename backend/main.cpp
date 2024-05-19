#include <iostream>
#include <iomanip>

#include "TokenUtilities.h"
#include "DatabaseService.h"
#include "WebSocketService.h"

int main() {
    TokenUtilities* tokenUtil = new TokenUtilities();
    DatabaseService* dbService = new DatabaseService();
    WebSocketService* wsService = new WebSocketService();

    try {
        SQLite::Database db("main.db3", SQLite::OPEN_READWRITE | SQLite::OPEN_CREATE);
        dbService->createTables(db);

        crow::App<crow::CORSHandler> app;
        app.loglevel(crow::LogLevel::Warning);

        auto& cors = app.get_middleware<crow::CORSHandler>();
        cors.global()
            .methods("POST"_method, "GET"_method)
            .prefix("/")
            .origin("*")
            .allow_credentials();

        CROW_ROUTE(app, "/health")
        ([]() {
            return "Healthy";
        });

        CROW_ROUTE(app, "/register")
        .methods("POST"_method)
        ([&db, tokenUtil](const crow::request& req) {
            auto json = crow::json::load(req.body);
            if (!json)
                return crow::response(400);
            if (!json.has("username") || json["username"].t() != crow::json::type::String)
                return crow::response(400);
            if (!json.has("password") || json["password"].t() != crow::json::type::String)
                return crow::response(400);

            std::string username = json["username"].s();
            std::string password = json["password"].s();

            SQLite::Statement query(db, "SELECT COUNT(*) FROM users WHERE username = ?");
            query.bind(1, username);
            if (query.executeStep()) {
                int count = query.getColumn(0).getInt();
                if (count != 0) {
                    crow::json::wvalue response;
                    response["message"] = "Username is already taken";
                    return crow::response(response);
                }
            }

            SQLite::Statement insertQuery(db, "INSERT INTO users (username, password) VALUES (?, ?)");
            insertQuery.bind(1, username);
            insertQuery.bind(2, password); // Ideally, we should encrypt the password.
            insertQuery.exec();

            crow::json::wvalue response;
            response["token"] = tokenUtil->generateToken(username, password);

            return crow::response(response);
        });

        CROW_ROUTE(app, "/login")
        .methods("POST"_method)
        ([&db, tokenUtil, wsService, dbService](const crow::request& req) {
            auto json = crow::json::load(req.body);
            if (!json)
                return crow::response(400);
            if (!json.has("username") || json["username"].t() != crow::json::type::String)
                return crow::response(400);
            if (!json.has("password") || json["password"].t() != crow::json::type::String)
                return crow::response(400);

            std::string token = tokenUtil->generateToken(json["username"].s(), json["password"].s());

            auto userId = dbService->getUserID(db, token.substr(6));
            if (!userId.has_value())
                return crow::response(403);

            crow::json::wvalue response;
            response["token"] = token;
            response["userID"] = userId.value();

            return crow::response(response);
        });

        CROW_ROUTE(app, "/users/<string>")
        ([&db, dbService](const crow::request& req, std::string username) {
            const auto& headers = req.headers;
            auto authHeader = headers.find("Authorization");
            if (authHeader == headers.end())
                return crow::response(403);

            auto userId = dbService->getUserID(db, authHeader->second.substr(6));
            if (!userId.has_value())
                return crow::response(403);

            SQLite::Statement query(db, "SELECT * FROM users WHERE LOWER(username) LIKE '%' || LOWER(?) || '%';");
            query.bind(1, username);

            std::vector<crow::json::wvalue> users;
            try {
                while (query.executeStep()) {
                    crow::json::wvalue user;
                    user["id"] = query.getColumn(0).getInt();
                    user["username"] = query.getColumn(1).getText();
                    users.push_back(user);
                }
            } catch (const std::exception& e) {
                CROW_LOG_ERROR << "Error executing SQL query: " << e.what();
                return crow::response(500);
            }

            crow::json::wvalue response = std::move(users);

            return crow::response(response);
        });

        CROW_ROUTE(app, "/chats/")
        ([&db, dbService](const crow::request& req) {
            const auto& headers = req.headers;
            auto authHeader = headers.find("Authorization");
            if (authHeader == headers.end())
                return crow::response(403);

            auto userId = dbService->getUserID(db, authHeader->second.substr(6));
            if (!userId.has_value())
                return crow::response(403);

            SQLite::Statement query(db, "SELECT m.receiverID, u.username AS sender_username, u2.username AS receiver_username, m.message, m.created_at FROM messages m JOIN users u ON m.senderID = u.id JOIN users u2 ON m.receiverID = u2.id WHERE (m.senderID = ? OR m.receiverID = ?) AND NOT EXISTS (SELECT 1 FROM messages m2 WHERE ((m2.senderID = m.senderID AND m2.receiverID = m.receiverID) OR (m2.senderID = m.receiverID AND m2.receiverID = m.senderID)) AND m2.created_at > m.created_at) GROUP BY CASE WHEN m.senderID < m.receiverID THEN m.senderID || '-' || m.receiverID ELSE m.receiverID || '-' || m.senderID END ORDER BY m.created_at DESC;");
            query.bind(1, userId.value());
            query.bind(2, userId.value());

            std::vector<crow::json::wvalue> chats;
            try {
                while (query.executeStep()) {
                    crow::json::wvalue chat;
                    chat["id"] = query.getColumn(0).getInt();
                    chat["senderName"] = query.getColumn(1).getText();
                    chat["recipientName"] = query.getColumn(2).getText();
                    chat["message"] = query.getColumn(3).getText();
                    chat["created_at"] = query.getColumn(4).getText();
                    chats.push_back(chat);
                }
            } catch (const std::exception& e) {
                CROW_LOG_ERROR << "Error executing SQL query: " << e.what();
                return crow::response(500);
            }

            crow::json::wvalue response = std::move(chats);

            return crow::response(response);
        });

        CROW_ROUTE(app, "/chats/<int>")
        ([&db, dbService](const crow::request& req, int recipientId) {
            const auto& headers = req.headers;
            auto authHeader = headers.find("Authorization");
            if (authHeader == headers.end())
                return crow::response(403);

            auto userId = dbService->getUserID(db, authHeader->second.substr(6));
            if (!userId.has_value())
                return crow::response(403);

            SQLite::Statement query(db, "SELECT * FROM messages WHERE (senderID = ? OR receiverID = ?) AND (senderID = ? OR receiverID = ?) ORDER BY created_at ASC;");
            query.bind(1, userId.value());
            query.bind(2, userId.value());
            query.bind(3, recipientId);
            query.bind(4, recipientId);

            std::vector<crow::json::wvalue> messages;
            try {
                while (query.executeStep()) {
                    crow::json::wvalue message;
                    message["id"] = query.getColumn(0).getInt();
                    message["senderID"] = query.getColumn(1).getInt();
                    message["receiverID"] = query.getColumn(2).getInt();
                    message["message"] = query.getColumn(3).getText();
                    message["created_at"] = query.getColumn(4).getText();
                    messages.push_back(message);
                }
            } catch (const std::exception& e) {
                CROW_LOG_ERROR << "Error executing SQL query: " << e.what();
                return crow::response(500);
            }

            crow::json::wvalue response = std::move(messages);

            return crow::response(response);
        });

        CROW_WEBSOCKET_ROUTE(app, "/ws")
        .onclose([&](crow::websocket::connection& conn, const std::string& reason) {})
        .onmessage([&db, wsService, dbService](crow::websocket::connection& conn, const std::string& data, bool isBinary) {
            auto dataJson = crow::json::load(data);
            if (!dataJson || !dataJson.has("__TYPE__"))
                return;

            if (dataJson["__TYPE__"] == "subscribe")
                wsService->initiateConnection(db, dataJson, &conn, dbService);
            else if (dataJson["__TYPE__"] == "message")
                wsService->sendMessage(db, dataJson, dbService);
        });

        app.port(8080).multithreaded().run();
    } catch (std::exception& e) {
        std::cout << "SQLite exception: " << e.what() << std::endl;
        return -1;
    }
    delete tokenUtil;
    return 0;
}
