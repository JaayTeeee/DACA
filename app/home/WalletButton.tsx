"use client";

import { Button, Text } from "@chakra-ui/react";
import { SSX } from "@spruceid/ssx";
import { useState } from "react";

export const WalletButton = () => {
  const [ssxProvider, setSSX] = useState<SSX | null>(null);

  const ssxHandler = async () => {
    const ssx = new SSX({
      providers: {
        server: {
          host: "http://localhost:3000/api",
        },
      },
    });
    await ssx.signIn();
    setSSX(ssx);
  };

  return (
    <Button
      className="button mt-4 fade-in"
      style={{ transition: "ease-in" }}
      onClick={ssxHandler}
    >
      <Text color="white" fontFamily="Noto Sans" fontWeight="bold">
        Sign in With Ethereum
      </Text>
    </Button>
  );
};
