#ifndef TOKENUTILITIES_H
#define TOKENUTILITIES_H

#include "crow.h"
#include <sstream>

class TokenUtilities {
public:
    std::string generateToken(const std::string& username, const std::string& password) {
        std::string combined = username + ":" + password;

        std::stringstream ss;
        ss << "Basic " << crow::utility::base64encode(combined, combined.size());
        return ss.str();
    }
};

#endif