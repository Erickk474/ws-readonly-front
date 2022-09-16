import { useEffect, useContext, useState } from "react";
import { SocketContext } from "../util/socket";
import { CRASH_ROOM_NAME } from "../util/gamesRoomId.js";

function Page1() {
  const { socket } = useContext(SocketContext);
  const [connected, setConnected] = useState(false);
  const [count, setCount] = useState(0);

  socket.on("joined", (data) => {
    console.log("Joined", data);
    setConnected(true);
  });

  socket.on("tick", (data) => {
    setCount(data?.count);
  });

  const joinRoom = () => {
    socket.emit("join-room", CRASH_ROOM_NAME);
  };

  return (
    <div style={{ background: "#c4ffb5" }}>
      <h1>Esse é um teste no Crash</h1>
      <br />
      <h3>Conectado: {`${connected}`}</h3>
      <br />
      <h3>Contagem: {count}</h3>
      <br />
      <button onClick={joinRoom}>Entrar na sala</button>
    </div>
  );
}

export default Page1;
