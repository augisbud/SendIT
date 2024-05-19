#ifndef TOKENUTILITIES_H
#define TOKENUTILITIES_H

#include "crow.h"
#include <array>

class TokenUtilities {
public:
    std::string generateToken(const std::string& username, const std::string& password);
};

#endif
