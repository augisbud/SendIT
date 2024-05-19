#ifndef CONNECTIONS_H
#define CONNECTIONS_H

#include "crow.h"

class Connection {
private:
    int UserId;
    crow::websocket::connection* User;

public:
    Connection(int userId, crow::websocket::connection* user) : UserId(std::move(userId)), User(std::move(user)) { }

    int getUserId() {
        return UserId;
    }

    crow::websocket::connection* getUser() {
        return User;
    }

    void setUser(crow::websocket::connection* newUser) {
        User = newUser;
    }
};

#endif