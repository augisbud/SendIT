#ifndef CONNECTIONS_H
#define CONNECTIONS_H

#include "crow.h"

class Connection {
private:
    int UserId;
    crow::websocket::connection* User;

public:
    Connection(int userId, crow::websocket::connection* user);

    int getUserId();
    crow::websocket::connection* getUser();
    void setUser(crow::websocket::connection* newUser);
};

#endif
