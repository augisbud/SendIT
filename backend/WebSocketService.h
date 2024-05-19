#ifndef WEBSOCKETSERVICE_H
#define WEBSOCKETSERVICE_H

#include "Connection.h"
#include "DatabaseService.h"

class WebSocketService {
private:
    std::vector<Connection> connections;

public:
    const void initiateConnection(SQLite::Database& db, crow::json::rvalue data, crow::websocket::connection* conn, DatabaseService* dbService) {
        if (!data.has("token") || data["token"].t() != crow::json::type::String)
            return;

        auto userId = dbService->getUserID(db, static_cast<std::string>(data["token"]).substr(6));
        if (!userId.has_value())
            return;

        bool existingConnection = false;

        for (auto& c : connections) {
            if (c.getUserId() == userId.value()) {
                c.setUser(conn);
                existingConnection = true;
                break;
            }
        }

        if (!existingConnection) {
            Connection connection(userId.value(), conn);
            connections.push_back(connection);
        }
    }

    void sendMessage(SQLite::Database& db, crow::json::rvalue data, DatabaseService* dbService) {
        if (!data.has("token") || data["token"].t() != crow::json::type::String)
            return;
        if (!data.has("recipientId") || data["recipientId"].t() != crow::json::type::Number)
            return;
        if (!data.has("message") || data["message"].t() != crow::json::type::String)
            return;

        auto userId = dbService->getUserID(db, static_cast<std::string>(data["token"]).substr(6));
        if (!userId.has_value())
            return;

        dbService->insertMessage(db, data, userId);

        SQLite::Statement query(db, "SELECT messages.id, messages.senderID, users.username, messages.message, messages.created_at FROM messages INNER JOIN users ON messages.senderID = users.id WHERE messages.id = ?");
        query.bind(1, db.getLastInsertRowid());

        if (query.executeStep()) {
            crow::json::wvalue chat;
            chat["id"] = query.getColumn(0).getInt();
            chat["senderId"] = query.getColumn(1).getInt();
            chat["username"] = query.getColumn(2).getText();
            chat["message"] = query.getColumn(3).getText();
            chat["created_at"] = query.getColumn(4).getText();

            for (auto& c : connections)
                if (c.getUser() && c.getUserId() == static_cast<int>(data["recipientId"]))
                    c.getUser()->send_text(chat.dump());
        }
    }
};

#endif