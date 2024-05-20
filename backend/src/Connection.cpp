#include "Connection.h"

Connection::Connection(int userId, crow::websocket::connection* user) : UserId(std::move(userId)), User(std::move(user)) { }

int Connection::getUserId() const {
    return UserId;
}

crow::websocket::connection* Connection::getUser() const {
    return User;
}

void Connection::setUser(crow::websocket::connection* newUser) {
    User = newUser;
}
