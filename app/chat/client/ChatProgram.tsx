"use client";
import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import "../../globals.css";
import ChatInterface from "./ChatInterface";

interface Message {
  room: number;
  author: string;
  message: string;
  time: string;
}

const ChatProgram = ({
  username,
  room,
}: {
  username: string;
  room: number;
}) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState<Message[]>([]);
  const socket = socketIOClient("http://localhost:4000");

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data: any) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <ChatInterface>
      <div>
        <div className="chat-body">
          {/* <ScrollToBottom className="message-container">
            {messageList.map((messageContent) => {
              return (
                <div
                  className="message"
                  id={username === messageContent.author ? "you" : "other"}
                >
                  <div>
                    <div className="message-content">
                      <p>{messageContent.message}</p>
                    </div>
                    <div className="message-meta">
                      <p id="time">{messageContent.time}</p>
                      <p id="author">{messageContent.author}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom> */}
        </div>
      </div>
    </ChatInterface>
  );
};

export default ChatProgram;
