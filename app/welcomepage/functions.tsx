"use client";
import React, { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
import { useRouter } from 'next/router';

export default function CheckUsername() {
  const router = useRouter();
  const { address } = router.query;
  const [checkData, setCheckData] = useState<{ success: boolean; address?: string } | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const checkRequest = new Request('http://localhost:3001/api/checkUsername', {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }),
          mode: 'cors',
          body: JSON.stringify({ id: address }),
        });

        const checkResponse = await fetch(checkRequest);
        const checkData = await checkResponse.json();

        if (checkResponse.ok && checkData.success) {
          console.log(checkData);
          setCheckData(checkData);
        } else {
          console.error('Failed to check username:', checkResponse);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }

    if (address) {
      fetchData();
    }
  }, [address]);

  return (
    <div>
      {checkData?.address && (
        <Text className="daca-font">{checkData.address}</Text>
      )}
    </div>
  );
}
