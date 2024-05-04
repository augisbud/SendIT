cmake_minimum_required(VERSION 3.5)
project(BridgeServer)

set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

set(SQLITECPP_RUN_CPPCHECK OFF CACHE BOOL "" FORCE)
set(SQLITECPP_RUN_CPPLINT OFF CACHE BOOL "" FORCE)
add_subdirectory(external/SQLiteCpp)

add_executable(Bridge src/main.cpp)

target_link_libraries(Bridge SQLiteCpp)
