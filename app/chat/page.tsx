"use client";

import { useEffect, useState } from "react";
import ChatProgram from "./client/ChatProgram";

const Chat = () => {
  const room = 1;
  const [address, setAddress] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const addressFromQuery = urlSearchParams.get("address");
    setAddress(addressFromQuery);

    async function fetchData() {
      try {
        const checkRequest = new Request(
          "http://localhost:3001/api/chatLanguage",
          {
            method: "POST",
            headers: new Headers({
              "Content-Type": "application/json",
              Accept: "application/json",
            }),
            mode: "cors",
            body: JSON.stringify({ id: addressFromQuery }),
          }
        );

        const checkResponse = await fetch(checkRequest);
        const checkData = await checkResponse.json();

        if (checkResponse.ok && checkData.success) {
          const userRequest = new Request(
            "http://localhost:3001/api/findUser",
            {
              method: "POST",
              headers: new Headers({
                "Content-Type": "application/json",
                Accept: "application/json",
              }),
              mode: "cors",
              body: JSON.stringify({
                chatPreference: checkData.chatPreference,
                address: addressFromQuery,
              }),
            }
          );

          const userResponse = await fetch(userRequest);
          const userData = await userResponse.json();

          if (userResponse.ok && userData.success) {
            console.log("User connected successfully");
            setUsername(userData.username); // Set the username state
          } else {
            console.error("Failed to connect with user:", userResponse);
          }
        } else {
          console.error(
            "Failed to check chat language preference:",
            checkResponse
          );
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    if (address) {
      fetchData();
    }
  }, [address]);

  return (
    <>
      <ChatProgram username={username} room={room} />
    </>
  );
};

export default Chat;