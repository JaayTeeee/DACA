"use client";

import { Button, Text } from "@chakra-ui/react";
import { SSX } from "@spruceid/ssx";
import { redirect } from "next/navigation";
import { useState } from "react";

export const WalletButton = () => {
  const [ssxProvider, setSSX] = useState<SSX | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [redirectTo, setRedirectTo] = useState("");
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
      setRedirectTo("/signup");
    } catch (error) {
      console.error("Sign-in failed:", error);
      setErrorMessage("Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (redirectTo) {
    redirect("/signup");
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
          <Button
            className="button mt-4 fade-in"
            style={{ transition: "ease-in" }}
            onClick={ssxHandler}
          >
            <Text color="white" fontFamily="Noto Sans" fontWeight="bold">
              Sign in With Ethereum
            </Text>
          </Button>
        </>
      )}
    </>
  );
};
