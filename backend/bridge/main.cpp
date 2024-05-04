#include <iostream>
#include <cstdio>
#include <cstdlib>

#include <SQLiteCpp/SQLiteCpp.h>
#include "crow.h"

#ifdef SQLITECPP_ENABLE_ASSERT_HANDLER
namespace SQLite
{
    /// definition of the assertion handler enabled when SQLITECPP_ENABLE_ASSERT_HANDLER is defined in the project (CMakeList.txt)
    void assertion_failed(const char* apFile, const long apLine, const char* apFunc, const char* apExpr, const char* apMsg)
    {
        // Print a message to the standard error output stream, and abort the program.
        std::cerr << apFile << ":" << apLine << ":" << " error: assertion failed (" << apExpr << ") in " << apFunc << "() with message \"" << apMsg << "\"\n";
        std::abort();
    }
}
#endif

int main ()
{
    std::cout << "SQlite3 version " << SQLite::VERSION << " (" << SQLite::getLibVersion() << ")" << std::endl;
    std::cout << "SQliteC++ version " << SQLITECPP_VERSION << std::endl;

    try
    {
        SQLite::Database    db("test.db3", SQLite::OPEN_READWRITE|SQLite::OPEN_CREATE);
        std::cout << "SQLite database file '" << db.getFilename().c_str() << "' opened successfully\n";

        db.exec("DROP TABLE IF EXISTS test");
        db.exec("CREATE TABLE test (id INTEGER PRIMARY KEY, value TEXT)");

        int nb = db.exec("INSERT INTO test VALUES (NULL, \"test\")");
        std::cout << "INSERT INTO test VALUES (NULL, \"test\")\", returned " << nb << std::endl;

        nb = db.exec("INSERT INTO test VALUES (NULL, \"second\")");
        std::cout << "INSERT INTO test VALUES (NULL, \"second\")\", returned " << nb << std::endl;

        nb = db.exec("UPDATE test SET value=\"second-updated\" WHERE id='2'");
        std::cout << "UPDATE test SET value=\"second-updated\" WHERE id='2', returned " << nb << std::endl;

        SQLite::Statement   query(db, "SELECT * FROM test");
        std::cout << "SELECT * FROM test :\n";
        while (query.executeStep())
        {
            std::cout << "row (" << query.getColumn(0) << ", \"" << query.getColumn(1) << "\")\n";
        }

        db.exec("DROP TABLE test");
    }
    catch (std::exception& e)
    {
        std::cout << "SQLite exception: " << e.what() << std::endl;
        return EXIT_FAILURE;
    }
    remove("test.db3");

    std::cout << "everything ok, quitting\n";

    crow::SimpleApp app;

    CROW_ROUTE(app, "/")([](){
        return "Hello world";
    });

    app.port(18080).multithreaded().run();

    return EXIT_SUCCESS;
}
