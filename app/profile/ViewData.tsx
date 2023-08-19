"use client";
import React, { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";

export default function ViewData() {
  const [address, setAddress] = useState<string | null>(null);
  const [checkData, setCheckData] = useState<{
    success: boolean;
    username?: string;
    age?: number;
    gender?: string;
    chatPreference?: string;
  } | null>(null);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const addressFromQuery = urlSearchParams.get('address');
    setAddress(addressFromQuery);

    async function fetchData() {
      try {
        const checkRequest = new Request('http://localhost:3001/api/viewData', {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }),
          mode: 'cors',
          body: JSON.stringify({ id: addressFromQuery }),
        });

        const checkResponse = await fetch(checkRequest);
        const checkData = await checkResponse.json();

        if (checkResponse.ok && checkData.success) {
          console.log(checkData);
          setCheckData(checkData);
        } else {
          console.error('Failed to view user data:', checkResponse);
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
    <>
      {checkData?.username && checkData?.age && checkData?.gender && checkData?.chatPreference && (
        <div>
          <Text className="body_font">{checkData.username}</Text>
          <Text className="body_font">{checkData.age}</Text>
          <Text className="body_font">{checkData.gender}</Text>
          <Text className="body_font">{checkData.chatPreference}</Text>
        </div>
      )}
    </>
  );
}
