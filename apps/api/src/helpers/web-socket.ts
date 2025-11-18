import http from "node:http";
import { Server, Socket } from "socket.io";

import { frontendUrl } from "@config/api.config";

let io: Server;

export function initSocketServer(httpServer: http.Server) {
    console.log("Initializing Socket.IO server...");

    io = new Server(httpServer, {
        cors: {
            origin: frontendUrl,
            methods: [ "GET", "POST" ],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log("Client connected:", socket.id);

        // addSocketListener(socket);

        socket.on('disconnect', (reason) => {
            console.log(`Client disconnected, reason: ${reason}`);
        });

        socket.on('error', (error) => {
            console.error('Socket error:', error);
        });
    });

    return io;
}

export function addSocketEmitter(event: string, args: any) {
    io.emit(event, args);
}

// function addSocketListener(socket: Socket) {
//     socket.on("cv:uploaded", (data) => {
//         console.log(data)
//         addSocketEmitter("cv:extracted", { status: "success" });
//     });
// }
