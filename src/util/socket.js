import { createContext } from "react";
import io from "socket.io-client";

// const socketURL = "https://hero-ws-games-pz6deuyr6a-rj.a.run.app";
const socketURL = "https://hero-ws-games-pz6deuyr6a-rj.a.run.app";
// const socketURL = "http://localhost:4000";
const socket = io(socketURL, {
  transports: ["websocket"],
});

export const SocketContext = createContext({ socket });
