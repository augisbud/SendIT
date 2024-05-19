#ifndef TOKENUTILITIES_H
#define TOKENUTILITIES_H

#include "crow.h"
#include <array>
#include <string>

class TokenUtilities {
public:
    struct Credentials {
        std::string username;
        std::string password;
    };

    std::string generateToken(const std::string& username, const std::string& password);
    Credentials getCredentials(const std::string& token);
};

#endif
