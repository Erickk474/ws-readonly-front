import CountUp from "react-countup";

import { useEffect, useContext, useState } from "react";
import { SocketContext } from "../util/socket";
import { DICE_ROOM_NAME } from "../util/gamesRoomId.js";

function Page1() {
  // List of all events listeners on this page;
  const eventListeners = ["tick", "leaved-room", "joined"];

  const { socket } = useContext(SocketContext);
  const [socketJoined, setSocketJoined] = useState(false);
  const [gameStatus, setGameStatus] = useState(false);
  const [startsAt, setStartsAt] = useState(0);
  const [endsAt, setEndsAt] = useState(0);
  const [multiplier, setMultiplier] = useState(0);

  // Needed to remove all duplicate listeners to improve performance
  const removeEventListeners = () => {
    eventListeners.forEach((event) => socket.removeListener(event));
  };

  useEffect(() => {
    console.log("Foi");
    removeEventListeners();

    socket.on("joined", () => {
      console.log("Joined");
      setSocketJoined(true);
    });

    socket.on("tick", (data) => {
      setGameStatus(data?.game_status);
      setStartsAt(data?.starts_at);
      setEndsAt(data?.ends_at);
      setMultiplier(data?.final_multiplier);
    });

    socket.on("leaved-room", (data) => {
      console.log("leaved-room", data);
      setSocketJoined(false);
    });

    if (!socketJoined) {
      joinRoom();
    }
  }, []);

  const leaveRoom = () => {
    socket.emit("leave-out-room", DICE_ROOM_NAME);
  };

  const joinRoom = () => {
    socket.emit("join-in-room", DICE_ROOM_NAME);
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
      <GameStatusAdvice
        gameStatus={gameStatus}
        startsAt={startsAt}
        endsAt={endsAt}
        multiplier={multiplier}
      />
      <br />
      <h3>Termina: {endsAt}</h3>
      <CountUp
        decimals={2}
        suffix="s"
        start={100}
        end={0}
        useEasing={false}
        duration={100}
      />
      <br />
      <h3>Multiplicador: {multiplier}</h3>
      <br />
      <button onClick={leaveRoom}>Sair da sala</button>
      <br />
      <button onClick={joinRoom}>Entrar na sala</button>
      <br />
      <button onClick={checkRooms}>Verificação das salas</button>
    </div>
  );
}

const GameStatusAdvice = ({ gameStatus, startsAt, endsAt, multiplier }) => {
  if (gameStatus === "finished") {
    const dateNow = new Date().getTime();
    console.log({
      startsAt,
      endsAt,
      dateNow,
      difference: dateNow - endsAt * 1000,
    });
  }

  if (gameStatus === "waiting") {
    return (
      <h3>
        Começa em{" "}
        <CountUp
          start={startsAt}
          end={endsAt}
          duration={2.75}
          separator=" "
          decimals={4}
          decimal="."
          suffix="s"
        ></CountUp>
      </h3>
    );
  }

  if (gameStatus === "started") {
    return (
      <h3>
        Subindo...{" "}
        <CountUp
          start={startsAt}
          end={endsAt}
          duration={2.75}
          separator=" "
          decimals={4}
          decimal="."
          suffix="s"
        ></CountUp>
      </h3>
    );
  }

  return <h3>Quebrou! {multiplier}</h3>;
};

export default Page1;
