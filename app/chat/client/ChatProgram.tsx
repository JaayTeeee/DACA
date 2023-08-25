import BlackBgUserIcon from "@/public/component/icons/icons8-user-100_1.png";
import WhiteBgUserIcon from "@/public/component/icons/icons8-user-100_2.png";
import LogoutIcon from "@/public/component/icons/icons8-log-out-50.png";
import { useRouter } from "next/navigation";
import { Text } from "@/public/styles/chakra";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import "../../globals.css";
import ChatInterface from "./ChatInterface";
import { CircleButton } from "@/public/component/CircleButton";

interface Message {
  author: string;
  message: string;
  time: string;
  type?: "system";
}

const ChatProgram = ({ username }: { username: string }) => {
  const router = useRouter();
  const [redirectTo, setRedirectTo] = useState("");
  const [address, setAddress] = useState<string | null>(null);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isChatDisabled, setIsChatDisabled] = useState(false);
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<
    "connecting" | "connected" | "failed" | "closed" | "disconnected"
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
    const urlSearchParams = new URLSearchParams(window.location.search);
    const addressFromQuery = urlSearchParams.get("address");
    setAddress(addressFromQuery);
  }, [address]);

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

    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, [username]);

  const handleClick = () => {
    if (address !== null) {
      const encodedAddress = encodeURIComponent(address);
      setRedirectTo(`/welcome?address=${encodedAddress}`);
      
      if (socket.current) {
        socket.current.onclose = () => {
          setConnectionStatus("closed");
          setIsChatDisabled(true); // Disable the chat box
        };
        const leaveMessage: Message = {
          author: "System",
          message: "The user has left the chat",
          time: `${new Date().getHours()}:${new Date().getMinutes()}`,
          type: "system",
        };
        socket.current.send(JSON.stringify(leaveMessage)); // Send the system message
        setMessageList((list) => [...list, leaveMessage] as Message[]);
        setConnectionStatus("disconnected");
        socket.current.close();
      }
    }
  };

  useEffect(() => {
    if (redirectTo) {
      router.push(redirectTo);
    }
  }, [redirectTo, router]);

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
            )  : connectionStatus === "disconnected" ? (
                <div className="leave-message">
                  The user has left the chat
                </div>
            ) : connectionStatus === "closed" ? (
              <div className="close-message">You has left the chat</div>
            ) : (
              <div className="connecting-message">Connecting with user...</div>
            )}
          </div>
          {messageList.map((messageContent, index) => {
            return (
              <React.Fragment key={index}>
                {messageContent.type === "system" ? (
                <div className="system-message"  style={{ color: "grey", opacity: 0.7 }}>
                  {messageContent.message}
                </div>
                ) : username === messageContent.author ? (
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
            disabled={isChatDisabled} // Disable the input when chat is disabled
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
            disabled={isChatDisabled} // Disable the button when chat is disabled
          >
            <Text className="daca-font" fontSize="lg" color="white">
              SEND
            </Text>
          </button>
          <CircleButton
              buttonStyle={{ backgroundColor: "rgba(66, 107, 253, 0.4)" }}
              imgStyle={{ marginLeft: "5px", height: "60%", width: "50%" }}
              imgSrc={LogoutIcon}
              desc="logout-icon"
              onClick={handleClick}
            />
        </div>
      </div>
    </ChatInterface>
  );
};

export default ChatProgram;
