#include <iostream>
#include <cstdio>
#include <cstdlib>

#include <SQLiteCpp/SQLiteCpp.h>
#include "crow.h"

int main ()
{
    SQLite::Database db("main.db3", SQLite::OPEN_READWRITE|SQLite::OPEN_CREATE);
    std::cout << "SQLite database file '" << db.getFilename().c_str() << "' opened successfully\n";

    db.exec("DROP TABLE IF EXISTS test");
    db.exec("CREATE TABLE test (id INTEGER PRIMARY KEY, value TEXT)");
    db.exec("INSERT INTO test VALUES (NULL, \"test\")");
    db.exec("INSERT INTO test VALUES (NULL, \"second\")");

    crow::SimpleApp app;

    CROW_ROUTE(app, "/")([&db](){
        std::string result = "SELECT * FROM test :\n";

        SQLite::Statement query(db, "SELECT * FROM test");
        while (query.executeStep())
        {
            result += "row (" + std::to_string(query.getColumn(0).getInt()) + ", \"" + query.getColumn(1).getText() + "\")\n"; // Use appropriate functions to retrieve data
        }

        return result;
    });

    app.port(8080).multithreaded().run();

    return 0;
}
