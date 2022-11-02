// import {
//     ClientToServerEvents,
//     ServerToClientEvents,
//     InterServerEvents,
//     SocketData
// } from 'SocketTypes';

// https://socket.io/docs/v4/server-api/
// https://socket.io/docs/v4/server-options/

import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        methods: ['GET', 'PUT', 'POST']
    }
});

io.on("connection", (socket) => {
    console.log("I, the server, got a connection !!!!!!!")
});

httpServer.listen(3000);
console.log("Server is listening")