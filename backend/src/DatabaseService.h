#ifndef DATABASESERVICE_H
#define DATABASESERVICE_H

#include <optional>
#include <SQLiteCpp/SQLiteCpp.h>
#include "crow.h"

class DatabaseService {
public:
    std::optional<int> getUserID(SQLite::Database& db, std::string token);
    void createTables(SQLite::Database& db);
    void insertMessage(SQLite::Database& db, crow::json::rvalue data, std::optional<int> userId);
};

#endif
