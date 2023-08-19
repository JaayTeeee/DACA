"use client";

import { RectangleButton } from "@/public/component/RectangleButton";
import { Text } from "@chakra-ui/react";
import { SSX } from "@spruceid/ssx";
import { redirect } from "next/navigation";
import { useState } from "react";

export const WalletButton = () => {
  const [ssxProvider, setSSX] = useState<SSX | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [redirectToSignUp, setRedirectToSignUp] = useState("");
  const [redirectToWelcome, setRedirectToWelcome] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const ssxHandler = async () => {
    setLoading(true);

    const ssx = new SSX({
      providers: {
        server: {
          host: "http://localhost:3000/api",
        },
      },
    });

    try {
      await ssx.signIn();
      setSSX(ssx);
      setLoading(false);

      const address = ssx.userAuthorization.address(); // Get the address
      console.log(address);

      if (address) {
        const checkRequest = new Request("http://localhost:3001/api/check", {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
            Accept: "application/json",
          }),
          mode: "cors",
          body: JSON.stringify({ id: address }),
        });

        const checkResponse = await fetch(checkRequest);
        const checkData = await checkResponse.json();

        if (checkData.success === true) {
          const encodedAddress = encodeURIComponent(address);
          setRedirectToWelcome(`/welcomepage?address=${encodedAddress}`);
        } else {
          const insertRequest = new Request(
            "http://localhost:3001/api/insertid",
            {
              method: "POST",
              headers: new Headers({
                "Content-Type": "application/json",
                Accept: "application/json",
              }),
              mode: "cors",
              body: JSON.stringify({ id: address }),
            }
          );

          const insertResponse = await fetch(insertRequest);

          if (insertResponse.ok) {
            const encodedAddress = encodeURIComponent(address);
            setRedirectToSignUp(`/signup?address=${encodedAddress}`);
          } else {
            console.error("Failed to insert address:", insertResponse);
            // Handle the case when insert request fails
          }
        }
      } else {
        console.error("Address is undefined.");
        // Handle the case when address is undefined
      }
    } catch (error) {
      console.error("Sign-in failed:", error);
      setErrorMessage("Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (redirectToWelcome) {
    redirect(redirectToWelcome);
  } else if (redirectToSignUp) {
    redirect(redirectToSignUp);
  }

  return (
    <>
      {isLoading ? (
        <Text className="daca-font">Loading...</Text>
      ) : (
        <>
          {errorMessage && (
            <Text className="error-message">{errorMessage}</Text>
          )}
          <RectangleButton onClick={ssxHandler} text="Sign in With Ethereum" />
        </>
      )}
    </>
  );
};
