// import { useState } from "react";
import ChatProgram from "./client/ChatProgram";

const socket = require("../database/database");

export const Chat = () => {
  // const [username, setUsername] = useState("");
  const room = 1;
  socket.emit("join_room", room);
  const username = "test";

  return (
    <>
      <ChatProgram socket={socket} username={username} room={room} />
    </>
  );
};
