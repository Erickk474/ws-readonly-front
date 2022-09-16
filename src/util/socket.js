import { createContext } from "react";
import io from "socket.io-client";

const socketURL = "http://localhost:3333";
const socket = io(socketURL, {
  transports: ["websocket"],
});

export const SocketContext = createContext({ socket });
