cmake_minimum_required (VERSION 3.5)
project(BridgeServer)

set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

include_directories(external/Asio)
include_directories(external/Crow)
add_subdirectory(external/SQLiteCpp)

add_executable(executable main.cpp 
                src/Connection.cpp 
                src/DatabaseService.cpp 
                src/TokenUtilities.cpp 
                src/WebSocketService.cpp)
target_link_libraries(executable SQLiteCpp)