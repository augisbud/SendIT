#ifndef WEBSOCKETSERVICE_H
#define WEBSOCKETSERVICE_H

#include <vector>
#include "Connection.h"
#include "DatabaseService.h"
#include "TokenUtilities.h"
#include "crow.h"

class WebSocketService {
private:
    std::vector<Connection> connections;

public:
    void initiateConnection(crow::json::rvalue data, crow::websocket::connection* conn, DatabaseService* dbService, TokenUtilities* tokenUtil);
    void removeConnection(crow::websocket::connection* conn);
    void sendMessage(crow::json::rvalue data, DatabaseService* dbService, TokenUtilities* tokenUtil);
};

#endif
