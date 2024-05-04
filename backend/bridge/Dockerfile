FROM gcc:latest

RUN apt-get update && apt-get install -y cmake

WORKDIR /app
COPY . .

RUN mkdir build

WORKDIR /app/build

RUN cmake ..
RUN make

WORKDIR /app

RUN cp build/executable .

ENTRYPOINT ["./executable"]
