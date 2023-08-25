"use client";

import { CircleButton } from "@/public/component/CircleButton";
import LogoutIcon from "@/public/component/icons/icons8-log-out-50.png";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "../../globals.css";

const RedirectToWelcomeButton = () => {
  const router = useRouter();
  const [redirectTo, setRedirectTo] = useState("");
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const addressFromQuery = urlSearchParams.get("address");
    setAddress(addressFromQuery);
  }, [address]);

  const handleClick = () => {
    if (address !== null) {
      const encodedAddress = encodeURIComponent(address);
      setRedirectTo(`/welcome?address=${encodedAddress}`);
    }
  };

  useEffect(() => {
    if (redirectTo) {
      router.push(redirectTo);
    }
  }, [redirectTo, router]);

  return (
    <CircleButton
      buttonStyle={{ backgroundColor: "rgba(66, 107, 253, 0.4)" }}
      imgStyle={{ marginLeft: "5px", height: "60%", width: "50%" }}
      imgSrc={LogoutIcon}
      desc="logout-icon"
      onClick={handleClick}
    />
  );
};

export default RedirectToWelcomeButton;
