import { io, Socket } from "socket.io-client";
import { websocketUrl } from "@/config/api.config";

let socket: Socket | null = null;

export function initSocketClient() {
    if (!socket) {
        socket = io(`${websocketUrl}`, {
            reconnectionAttempts: 5,
        });
    }

    socket.on("connect", () => {
        console.log(`Connected to Socket server (ID: ${socket?.id})`);
    })

    socket.on('connect_error', (err) => {
        console.error(`Connection to Socket server error: ${err.message}`);
    });

    socket.on('disconnect', (reason) => {
        console.log(`Disconnected from Socket server (${reason})`);
    });

    socket.on('error', (err) => {
        console.error(`Socket error: ${err.message}`);
    });
    
    const emit = (event: string, data: any) => {
        socket?.emit(event, data);
    }

    return {
        socket,
        emit,
    };
}

export function addSoccketListener(event: string, callback: (...args: any[]) => void) {
    if (!socket) console.warn("Socket client is not initialized");

    socket?.on(event, callback);
}
