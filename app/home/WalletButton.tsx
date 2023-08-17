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
      const address = ssx.userAuthorization.address();
      await ssx.signIn();
      setSSX(ssx);
      setLoading(false);
       //这里await check if address在database:  wallet----->ssx.userAuthorization.address()
       console.log(ssx.userAuthorization.address());
       //如果wallet address 在database:
       //setRedirectTo("/welcome");
       //else:
        const checkRequest = new Request('http://localhost:3001/api/check?address', {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }),
        mode: 'cors', // Set CORS mode to 'cors'
      });

      const checkResponse = await fetch(checkRequest);
      const checkData = await checkResponse.json();

      if(checkResponse.ok && checkData.success){
        setRedirectToWelcome("/welcome");
      } else {
        const insertRequest = new Request('http://localhost:3001/api/insertid', {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }),
          mode: 'cors', // Set CORS mode to 'cors'
          body: JSON.stringify({ id: ssx.userAuthorization.address() }),
        });
    
        const insertResponse = await fetch(insertRequest);
    
        if (insertResponse.ok) {
          setRedirectToSignUp("/signup");
        } else {
          console.error('Failed to insert address:', insertResponse);
        }
      }
    }
      catch (error) {
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
