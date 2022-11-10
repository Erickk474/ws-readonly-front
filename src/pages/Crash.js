import CountUp from "react-countup";

import { useEffect, useContext, useState } from "react";
import { SocketContext } from "../util/socket";
import { CRASH_ROOM_NAME } from "../util/gamesRoomId.js";

function Page1() {
  // List of all events listeners on this page;
  const eventListeners = ["tick", "leaved-room", "joined"];

  const { socket } = useContext(SocketContext);
  const [socketJoined, setSocketJoined] = useState(false);

  const [matchId, setMatchId] = useState(false);
  const [startsAt, setStartsAt] = useState(false);
  const [countdownNumber, setCountdownNumber] = useState(false);
  const [endsAt, setEndsAt] = useState(false);
  const [color, setColor] = useState(false);
  const [number, setNumber] = useState(false);

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
      const { countdown_number, color, number, ends_at, match_id, starts_at } =
        data;

      setMatchId(match_id);
      setStartsAt(starts_at);
      setCountdownNumber(countdown_number);
      setEndsAt(ends_at);
      setColor(color);
      setNumber(number);
    });

    socket.on("leaved-room", (data) => {
      console.log("leaved-room", data);
      setSocketJoined(false);
    });
  }, []);

  const leaveRoom = () => {
    socket.emit("leave-out-room", CRASH_ROOM_NAME);
  };

  const joinRoom = () => {
    socket.emit("join-in-room", CRASH_ROOM_NAME);
  };

  const checkRooms = () => {
    socket.emit("check-rooms", {});
  };

  return (
    <div style={{ background: "#c4ffb5" }}>
      <h1>Esse é um teste no CRASH</h1>
      <br />
      <h3>Conectado: {`${socketJoined}`}</h3>
      <br />
      <h3>MatchId: {matchId}</h3>
      <h3>StartsAt: {startsAt}</h3>
      <h3>EndsAt: {endsAt}</h3>
      <h3>CountdownNumber: {countdownNumber}</h3>
      <h3>Color: {color}</h3>
      <h3>Number: {number}</h3>
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
