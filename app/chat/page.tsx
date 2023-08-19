// import { useState } from "react";
import ChatProgram from "./client/ChatProgram";

const Chat = () => {
  // const [username, setUsername] = useState("");
  const room = 1;
  const username = "test";

  return (
    <>
      <ChatProgram username={username} room={room} />;
    </>
  );
};

export default Chat;
