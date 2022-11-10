import { useEffect, useContext, useState } from "react";
import { DOUBLE_ROOM_NAME } from "../util/gamesRoomId.js";
import { SocketContext } from "../util/socket";

function Page1() {
  // List of all events listeners on this page;
  const eventListeners = ["tick", "leaved-room", "joined"];

  const { socket } = useContext(SocketContext);
  const [socketJoined, setSocketJoined] = useState(false);
  const [count, setCount] = useState(0);

  // Needed to remove all duplicate listeners to improve performance
  const removeEventListeners = () => {
    eventListeners.forEach((event) => socket.removeListener(event));
  };

  useEffect(() => {
    removeEventListeners();

    socket.on("joined", () => {
      console.log("Joined");
      setSocketJoined(true);
    });

    socket.on("tick", (data) => {
      console.log("tick", data);
      setCount(data?.data?.count);
    });

    socket.on("leaved-room", (data) => {
      console.log("leaved-room", data);
      setSocketJoined(false);
    });

    socket.on("disconnect", (data) => {
      console.log("disconnect", data);
    });

    if (!socketJoined) {
      joinRoom();
    }
  }, []);

  const leaveRoom = () => {
    socket.emit("leave-out-room", DOUBLE_ROOM_NAME);
  };

  const joinRoom = () => {
    socket.emit("join-in-room", DOUBLE_ROOM_NAME);
  };

  const checkRooms = () => {
    socket.emit("check-rooms", {});
  };

  return (
    <div style={{ background: "#b5d1ff" }}>
      <h1>Esse é um teste no DOUBLE</h1>
      <br />
      <h3>Conectado: {`${socketJoined}`}</h3>
      <br />
      <h3>Contagem: {count}</h3>
      <br />
      <button onClick={leaveRoom}>Sair da sala</button>
      <br />
      <button onClick={joinRoom}>Entrar na sala</button>
      <br />
      <button onClick={checkRooms}>Verificação das salas</button>
    </div>
  );
}

export default Page1;
