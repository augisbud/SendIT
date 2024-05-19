#ifndef DATABASESERVICE_H
#define DATABASESERVICE_H

#include <optional>
#include <SQLiteCpp/SQLiteCpp.h>

class DatabaseService
{
public:
    std::optional<int> getUserID(SQLite::Database& db, std::string token) {
        std::string credentials = crow::utility::base64decode(token, token.size());

        size_t found = credentials.find(':');
        std::string username = credentials.substr(0, found);
        std::string password = credentials.substr(found + 1);

        SQLite::Statement query(db, "SELECT id FROM users WHERE username = ? AND password = ?");
        query.bind(1, username);
        query.bind(2, password);

        if (query.executeStep())
            return query.getColumn(0).getInt();
        else
            return std::nullopt;
    }

    void createTables(SQLite::Database& db) {
        db.exec("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT NOT NULL, password TEXT NOT NULL)");
        db.exec("CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, senderID INTEGER, receiverID INTEGER, message TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)");
    }

    void insertMessage(SQLite::Database& db, crow::json::rvalue data, std::optional<int> userId) {
        SQLite::Statement insertQuery(db, "INSERT INTO messages (senderID, receiverID, message) VALUES (?, ?, ?)");
        insertQuery.bind(1, userId.value());
        insertQuery.bind(2, static_cast<int>(data["recipientId"]));
        insertQuery.bind(3, static_cast<std::string>(data["message"]));
        insertQuery.exec();
    }
};


#endif