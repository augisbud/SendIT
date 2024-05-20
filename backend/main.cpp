#include <iostream>
#include <iomanip>
#include <memory>

#include "src/TokenUtilities.h"
#include "src/DatabaseService.h"
#include "src/WebSocketService.h"

int main() {
    SQLite::Database db("main.db3", SQLite::OPEN_READWRITE | SQLite::OPEN_CREATE);
    auto tokenUtil = std::make_unique<TokenUtilities>();
    auto dbService = std::make_unique<DatabaseService>(db);
    auto wsService = std::make_unique<WebSocketService>();

    try {
        dbService->createTables();

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
        ([&db, &tokenUtil](const crow::request& req) {
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
        ([&db, &tokenUtil, &wsService, &dbService](const crow::request& req) {
            auto json = crow::json::load(req.body);
            if (!json)
                return crow::response(400);
            if (!json.has("username") || json["username"].t() != crow::json::type::String)
                return crow::response(400);
            if (!json.has("password") || json["password"].t() != crow::json::type::String)
                return crow::response(400);

            std::string token = tokenUtil->generateToken(json["username"].s(), json["password"].s());

            auto userId = dbService->getUserID(token.substr(6), *tokenUtil);
            if (!userId.has_value())
                return crow::response(403);

            crow::json::wvalue response;
            response["token"] = token;
            response["userID"] = userId.value();

            return crow::response(response);
        });

        CROW_ROUTE(app, "/users/<string>")
        ([&db, &dbService, &tokenUtil](const crow::request& req, std::string username) {
            const auto& headers = req.headers;
            auto authHeader = headers.find("Authorization");
            if (authHeader == headers.end())
                return crow::response(403);

            auto userId = dbService->getUserID(authHeader->second.substr(6), *tokenUtil);
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
        ([&db, &dbService, &tokenUtil](const crow::request& req) {
            const auto& headers = req.headers;
            auto authHeader = headers.find("Authorization");
            if (authHeader == headers.end())
                return crow::response(403);

            auto userId = dbService->getUserID(authHeader->second.substr(6), *tokenUtil);
            if (!userId.has_value())
                return crow::response(403);

            SQLite::Statement query(db, 
                "SELECT m.id, "
                "       sender.username AS senderName, "
                "       receiver.username AS recipientName, "
                "       m.senderId, "
                "       m.receiverId, "
                "       m.message, "
                "       m.created_at "
                "FROM messages m "
                "JOIN users sender ON m.senderId = sender.id "
                "JOIN users receiver ON m.receiverId = receiver.id "
                "JOIN ( "
                "    SELECT  "
                "        CASE WHEN senderId = ? THEN receiverId ELSE senderId END AS other_user, "
                "        MAX(id) AS max_id "
                "    FROM messages "
                "    WHERE senderId = ? OR receiverId = ? "
                "    GROUP BY other_user "
                ") t ON (m.id = t.max_id);"
            );
            query.bind(1, userId.value());
            query.bind(2, userId.value());
            query.bind(3, userId.value());

            std::vector<crow::json::wvalue> chats;
            try {
                while (query.executeStep()) {
                    crow::json::wvalue chat;
                    chat["id"] = query.getColumn(0).getInt();
                    chat["senderName"] = query.getColumn(1).getText();
                    chat["recipientName"] = query.getColumn(2).getText();
                    chat["senderId"] = query.getColumn(3).getInt();
                    chat["receiverId"] = query.getColumn(4).getInt();
                    chat["message"] = query.getColumn(5).getText();
                    chat["created_at"] = query.getColumn(6).getText();
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
        ([&db, &dbService, &tokenUtil](const crow::request& req, int recipientId) {
            const auto& headers = req.headers;
            auto authHeader = headers.find("Authorization");
            if (authHeader == headers.end())
                return crow::response(403);

            auto userId = dbService->getUserID(authHeader->second.substr(6), *tokenUtil);
            if (!userId.has_value())
                return crow::response(403);

            SQLite::Statement query(db, "SELECT messages.id, messages.senderId, messages.receiverId, messages.message, messages.created_at, sender.username AS senderName FROM messages JOIN users AS sender ON messages.senderId = sender.id WHERE (messages.senderId = ? AND messages.receiverId = ?) OR (messages.receiverId = ? AND messages.senderId = ?) ORDER BY messages.created_at ASC;");
            query.bind(1, userId.value());
            query.bind(2, recipientId);
            query.bind(3, userId.value());
            query.bind(4, recipientId);

            std::vector<crow::json::wvalue> messages;
            try {
                while (query.executeStep()) {
                    crow::json::wvalue message;
                    message["id"] = query.getColumn(0).getInt();
                    message["senderId"] = query.getColumn(1).getInt();
                    message["receiverId"] = query.getColumn(2).getInt();
                    message["message"] = query.getColumn(3).getText();
                    message["created_at"] = query.getColumn(4).getText();
                    message["senderName"] = query.getColumn(5).getText();
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
        .onclose([&wsService](crow::websocket::connection& conn, const std::string& reason) {
            wsService->removeConnection(&conn);
        })
        .onmessage([&db, &wsService, &dbService, &tokenUtil](crow::websocket::connection& conn, const std::string& data, bool isBinary) {
            auto dataJson = crow::json::load(data);
            if (!dataJson || !dataJson.has("__TYPE__"))
                return;

            if (dataJson["__TYPE__"] == "subscribe")
                wsService->initiateConnection(dataJson, &conn, dbService.get(), tokenUtil.get());
            else if (dataJson["__TYPE__"] == "message")
                wsService->sendMessage(dataJson, dbService.get(), tokenUtil.get());
        });

        app.port(8080).multithreaded().run();
    } catch (std::exception& e) {
        std::cout << "SQLite exception: " << e.what() << std::endl;
        return -1;
    }
    return 0;
}
