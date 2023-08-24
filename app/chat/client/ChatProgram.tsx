import BlackBgUserIcon from "@/public/component/icons/icons8-user-100_1.png";
import WhiteBgUserIcon from "@/public/component/icons/icons8-user-100_2.png";
import { Text } from "@/public/styles/chakra";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import "../../globals.css";
import ChatInterface from "./ChatInterface";

interface Message {
  author: string;
  message: string;
  time: string;
}

const ChatProgram = ({ username }: { username: string }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<
    "connecting" | "connected" | "failed" | "closed"
  >("connecting"); // Initialize with 'connecting'

  const socket = useRef<WebSocket | null>(null);

  const sendMessage = () => {
    if (currentMessage !== "") {
      const messageData = {
        author: username,
        message: currentMessage,
        time: `${new Date().getHours()}:${new Date().getMinutes()}`,
      };

      if (socket.current) {
        socket.current.send(JSON.stringify(messageData));
        setMessageList((list) => [...list, messageData]);
        setCurrentMessage("");
      }
    }
  };

  useEffect(() => {
    socket.current = new WebSocket("ws://localhost:4000");

    socket.current.onmessage = (event: MessageEvent) => {
      const responseData = event.data;
      let data: any;

      if (responseData instanceof Blob) {
        const reader = new FileReader();

        reader.onload = () => {
          const parsedData = reader.result as string;

          try {
            data = JSON.parse(parsedData);
          } catch (error) {
            console.error("Failed to parse response data:", error);
            return;
          }

          if (data.author !== username) {
            setMessageList((list) => [...list, data]);
          }
        };

        reader.readAsText(responseData);
      } else {
        try {
          data = JSON.parse(responseData);
        } catch (error) {
          console.error("Failed to parse response data:", error);
          return;
        }

        if (data.author !== username) {
          setMessageList((list) => [...list, data]);
        }
      }
    };

    socket.current.onopen = () => {
      setConnectionStatus("connected");
    };

    socket.current.onerror = () => {
      setConnectionStatus("failed");
    };

    socket.current.onclose = () => {
      setConnectionStatus("closed");
    };

    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, [username]);

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messageList.length) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messageList]);

  return (
    <ChatInterface>
      <div className="chat-interface-container" style={{ textAlign: "center" }}>
        <div className="chat-body mt-[2rem]">
          <div className="mt-[2rem]" style={{ color: "grey", opacity: 0.7 }}>
            {connectionStatus === "connected" ? (
              <div className="success-message">
                Connected with user successfully... Enjoy the chat!
              </div>
            ) : connectionStatus === "failed" ? (
              <div className="error-message">
                Failed to connect to the server
              </div>
            ) : connectionStatus === "closed" ? (
              <div className="close-message">User has left the chat</div>
            ) : (
              <div className="connecting-message">Connecting with user...</div>
            )}
          </div>
          {messageList.map((messageContent, index) => {
            return (
              <React.Fragment key={index}>
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
                      src={BlackBgUserIcon}
                      alt="user-icon"
                      style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "100px",
                        backgroundColor: "black",
                        color: "white",
                        alignContent: "center",
                        marginLeft: "20px",
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex flex-row ml-[3rem] mt-[1rem]">
                    <Image
                      src={WhiteBgUserIcon}
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
                        marginLeft: "1rem",
                        display: "flex",
                        alignItems: "center",
                        padding: "10px 15px",
                      }}
                    >
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
                  </div>
                )}
              </React.Fragment>
            );
          })}
          <div ref={ref} />
        </div>
        <div className="chat-footer flex flex-row justify-center">
          <input
            type="text"
            style={{
              width: "70%",
              height: "44px",
              backgroundColor: "#FFFFFF",
              textIndent: "10px",
              marginTop: "20px",
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
