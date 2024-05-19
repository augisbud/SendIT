#ifndef WEBSOCKETSERVICE_H
#define WEBSOCKETSERVICE_H

#include "Connection.h"
#include "DatabaseService.h"

class WebSocketService {
private:
    std::vector<Connection> connections;

public:
    void initiateConnection(crow::json::rvalue data, crow::websocket::connection* conn, DatabaseService* dbService);
    void sendMessage(crow::json::rvalue data, DatabaseService* dbService);
};

#endif
