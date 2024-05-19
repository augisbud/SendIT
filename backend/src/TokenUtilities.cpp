#include "TokenUtilities.h"
#include <sstream>

std::string TokenUtilities::generateToken(const std::string& username, const std::string& password) {
    std::string combined = username + ":" + password;

    std::stringstream ss;
    ss << "Basic " << crow::utility::base64encode(combined, combined.size());
    return ss.str();
}

TokenUtilities::Credentials TokenUtilities::getCredentials(const std::string& token) {
    std::string credentials = crow::utility::base64decode(token, token.size());

    size_t found = credentials.find(':');

    std::string username = credentials.substr(0, found);
    std::string password = credentials.substr(found + 1);
    return { username, password };
}