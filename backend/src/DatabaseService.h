#ifndef DATABASESERVICE_H
#define DATABASESERVICE_H

#include <optional>
#include <SQLiteCpp/SQLiteCpp.h>
#include "crow.h"

class DatabaseService {
private:
    SQLite::Database& db;
public:
    DatabaseService(SQLite::Database& db);

    SQLite::Database& getDb() const;

    std::optional<int> getUserID(std::string token);
    void createTables();
    void insertMessage(crow::json::rvalue data, std::optional<int> userId);
};

#endif
