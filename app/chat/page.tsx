// import { useState } from "react";
import ChatProgram from "./client/ChatProgram";

const socket = require("../database/database");

const Chat = () => {
  // const [username, setUsername] = useState("");
  const room = 1;
  const username = "test";

  <ChatProgram username={username} room={room} />;
};

export default Chat;
