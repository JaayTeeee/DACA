"use client";
import { Text } from "@chakra-ui/react";
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
        <div className="chat-footer flex flex-row justify-center">
          <input
            type="text"
            style={{
              width: "60%",
              height: "44px",
              backgroundColor: "#FFFFFF",
              textIndent: "10px",
              marginTop: "10px",
              outline: "none",
              marginBottom: "10px",
              borderRadius: "8px",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
            value={currentMessage}
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            placeholder="Type your message..."
            required
          />
          <button
            onClick={sendMessage}
            className="mt-2"
            style={{
              width: "100px",
              height: "44px",
              borderRadius: "8px",
              marginTop: "11px",
              backgroundColor: "#2B4BC2",
              cursor: "pointer",
              marginLeft: "30px",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            <Text className="daca-font" fontSize="lg" color="white">
              SEND
            </Text>
          </button>
        </div>
      </div>
    </ChatInterface>
  );
};

export default ChatProgram;
