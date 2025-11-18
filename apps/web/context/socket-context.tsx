"use client";

import { ReactNode, createContext, useContext } from "react";
import { Socket } from "socket.io-client"
import { initSocketClient } from "@/utils/web-socket";

type SocketContextType = {
    socket: Socket | null;
    emit: (event: string, data: any) => void;
};

interface SocketProviderProps {
    children: ReactNode
}

const SocketContext = createContext<SocketContextType | null>(null);

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) throw new Error("useSocket must be used within SocketProvider");

    return context;
}

export function SocketProvider({ children }: SocketProviderProps) {
    const { socket, emit } = initSocketClient();

    return (
        <SocketContext.Provider value={{ socket, emit }}>
            {children}
        </SocketContext.Provider>
    ); 
}
