"use client";
import UserIcon from "@/public/component/icons/icons8-user-100.png";
import { Text } from "@/public/styles/chakra";
import Image from "next/image";
import { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
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
  const [connectionStatus, setConnectionStatus] = useState<
    "connecting" | "connected" | "failed" | "closed"
  >("connecting"); // Initialize with 'connecting'

  const socket = new WebSocket("ws://localhost:4000");

  const sendMessage = () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: `${new Date().getHours()}:${new Date().getMinutes()}`,
      };

      socket.send(JSON.stringify(messageData));

      setMessageList((list) => [...list, messageData]);

      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.author !== username) {
        setMessageList((list) => [...list, data]);
      }
    };

    socket.onopen = () => {
      setConnectionStatus("connected");
    };

    socket.onerror = () => {
      setConnectionStatus("failed");
    };

    socket.onclose = () => {
      setConnectionStatus("closed");
    };

    return () => {
      socket.close();
    };
  }, []);

  console.log(connectionStatus);

  return (
    <ChatInterface>
      <div className="chat-interface-container" style={{ textAlign: "center" }}>
        {/* Display connection status */}
        {connectionStatus === "connected" ? (
          <div className="success-message">
            Connected with user successfully...Enjoy the chat!
          </div>
        ) : connectionStatus === "failed" ? (
          <div className="error-message">Failed to connect to the server</div>
        ) : connectionStatus === "closed" ? (
          <div className="close-message">User has left the chat</div>
        ) : (
          <div className="connecting-message">Connecting with user...</div>
        )}

        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {messageList.map((messageContent) => {
              return (
                <>
                  {username === messageContent.author ? (
                    <div className="flex flex-row mr-[5rem] mt-[1rem] mb-[1rem]">
                      <div className="bubbleChat">
                        <Text
                          style={{
                            color: "white",
                            display: "flex",
                            alignItems: "right",
                            justifyContent: "left",
                          }}
                        >
                          {messageContent.message}
                        </Text>
                      </div>
                      <Image
                        src={UserIcon}
                        alt="user-icon"
                        style={{
                          width: "45px",
                          height: "45px",
                          borderRadius: "100px",
                          backgroundColor: "black",
                          alignContent: "center",
                          marginLeft: "20px",
                        }}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-row ml-[3rem] mt-[1rem]">
                      <Image
                        src={UserIcon}
                        alt="user-icon"
                        style={{
                          width: "45px",
                          height: "45px",
                          borderRadius: "100px",
                          backgroundColor: "grey",
                          alignContent: "center",
                          marginLeft: "20px",
                        }}
                      />
                      <div
                        className="bubbleChat"
                        style={{
                          backgroundColor: "grey",
                          marginLeft: "1rem", // Add margin to create space between the image and the bubble chat
                          display: "flex", // Set flex display to enable flex properties
                          alignItems: "center", // Center the content vertically
                          padding: "0.5rem", // Add padding to the bubble chat container
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            display: "flex",
                            alignItems: "center", // Center the text vertically within the bubble chat
                          }}
                        >
                          {messageContent.message}
                        </Text>
                      </div>
                    </div>
                  )}
                </>
              );
            })}
          </ScrollToBottom>
        </div>
        <div className="chat-footer flex flex-row justify-center">
          <input
            type="text"
            style={{
              width: "70%",
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
              backgroundColor: "#001d85",
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
