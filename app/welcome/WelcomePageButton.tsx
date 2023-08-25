"use client";
import { CircleButton } from "@/public/component/CircleButton";
import { RectangleButton } from "@/public/component/RectangleButton";
import HelpIcon from "@/public/component/icons/icons8-help-50.png";
import LogoutIcon from "@/public/component/icons/icons8-log-out-50.png";
import UserIcon from "@/public/component/icons/icons8-user-50.png";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { SSX } from "@spruceid/ssx";

export const TopThreeButtons = () => {
  const [redirectToHelp, setredirectToHelp] = useState("");
  const [ssxProvider, setSSX] = useState<SSX | null>(null);
  const [redirectToProfile, setredirectToProfile] = useState("");
  const router = useRouter();
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const addressFromQuery = urlSearchParams.get("address");
    setAddress(addressFromQuery);
  }, []);

  const ssxHandler = async () => {
    const ssx = new SSX({
      providers: {
        server: {
          host: "http://localhost:3000/api",
        },
      },
    });

    try {
      await ssxProvider?.signOut();
      setSSX(null);
      try {
        const request = new Request("http://localhost:3001/api/logout", {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
            Accept: "application/json",
          }),
          mode: "cors", // Set CORS mode to 'cors'
          body: JSON.stringify({ id: address }),
        });

        const res = await fetch(request);
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.statusText}`);
        }
        const response = await res.json();
        router.push("/home");
      } catch (error) {
        console.log("Error in inner try-catch: ", error);
      }
    } catch (error) {
      console.log("Error in outer try-catch: ", error);
    }
  };

  const handleHelpClick = () => {
    window.location.href = "mailto:support@daca.com";
  };

  const handleProfileClick = () => {
    if (address !== null) {
      const encodedAddress = encodeURIComponent(address);
      router.push(`/profile?address=${encodedAddress}`);
    }
  };

  return (
    <>
      <CircleButton
        imgSrc={HelpIcon}
        desc="help-icon"
        onClick={handleHelpClick}
      />
      <CircleButton
        imgSrc={UserIcon}
        desc="user-icon"
        onClick={handleProfileClick}
      />
      <CircleButton
        imgSrc={LogoutIcon}
        desc="logout-icon"
        imgStyle={{ height: "50%", width: "50%", marginLeft: "5%" }}
        onClick={ssxHandler}
      />
    </>
  );
};

export const RedirectToChatButton = () => {
  const router = useRouter();
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const addressFromQuery = urlSearchParams.get("address");
    setAddress(addressFromQuery);
  }, [address]);

  const handleClick = () => {
    if (address !== null) {
      const encodedAddress = encodeURIComponent(address);
      router.push(`/chat?address=${encodedAddress}`);
    }
  };

  return (
    <>
      <RectangleButton
        onClick={handleClick}
        text="Start Conversation"
        buttonStyle={{
          marginRight: "15px",
          marginTop: "-10px",
          width: "349px",
          height: "60px",
        }}
        textStyle={{ fontSize: "30px" }}
      />
    </>
  );
};
