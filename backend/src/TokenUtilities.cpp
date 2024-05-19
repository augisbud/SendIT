#include "TokenUtilities.h"
#include <sstream>

std::string TokenUtilities::generateToken(const std::string& username, const std::string& password) {
    std::string combined = username + ":" + password;

    std::stringstream ss;
    ss << "Basic " << crow::utility::base64encode(combined, combined.size());
    return ss.str();
}
