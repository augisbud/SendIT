#ifndef DATABASESERVICE_H
#define DATABASESERVICE_H

#include <optional>
#include <SQLiteCpp/SQLiteCpp.h>
#include "crow.h"
#include "TokenUtilities.h"

class DatabaseService {
private:
    SQLite::Database& db;
public:
    DatabaseService(SQLite::Database& db);

    SQLite::Database& getDb() const;

     std::optional<int> getUserID(const std::string& token, TokenUtilities& tokenUtil) const;
    void createTables();
    void insertMessage(crow::json::rvalue data, std::optional<int> userId);
    SQLite::Statement setQuery();
};

#endif