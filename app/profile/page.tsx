"use client";

import { RectangleButton } from "@/public/component/RectangleButton";
import EditIcon from "@/public/component/icons/icons8-edit-50.png";
import UserIcon from "@/public/component/icons/icons8-user-100.png";
import { Text } from "@/public/styles/chakra";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "../globals.css";
import ProfileContainer from "./profile";

export default function profilePage() {
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
    const addressFromQuery = urlSearchParams.get("address");
    setAddress(addressFromQuery);

    async function fetchData() {
      try {
        const checkRequest = new Request("http://localhost:3001/api/viewData", {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
            Accept: "application/json",
          }),
          mode: "cors",
          body: JSON.stringify({ id: addressFromQuery }),
        });

        const checkResponse = await fetch(checkRequest);
        const checkData = await checkResponse.json();

        if (checkResponse.ok && checkData.success) {
          console.log(checkData);
          setCheckData(checkData);
        } else {
          console.error("Failed to view user data:", checkResponse);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    if (address) {
      fetchData();
    }
  }, [address]);

  const router = useRouter();

  const handleBack = () => {
    router.push("/welcome");
  };

  const handleSave = () => {
    console.log("Save button clicked");
  };

  const handleDelete = () => {
    console.log("Delete button clicked");
  };
  return (
    <ProfileContainer>
      <div className="flex flex-col">
        <div className="flex justify-center mt-10">
          <div
            className="flex flex-row greyContainer"
            style={{
              position: "relative",
              marginLeft: "10px",
            }}
          >
            <Image
              src={UserIcon}
              alt="user-icon"
              style={{
                width: "75px",
                height: "75px",
                marginTop: "25px",
                marginLeft: "25px",
              }}
            />
            <Text
              className="daca-font"
              fontSize="85px"
              style={{ marginBottom: "25px", marginLeft: "10px" }}
            >
              PROFILE
            </Text>
          </div>
        </div>

        <div className="flex flex-col justify-start mt-[3rem] ml-[20rem]">
          {checkData?.username &&
            checkData?.age &&
            checkData?.gender &&
            checkData?.chatPreference && (
              <>
                <div className="flex flex-row mt-3">
                  <Image
                    src={EditIcon}
                    alt="user-icon"
                    style={{
                      width: "40px",
                      height: "40px",
                      marginRight: "25px",
                      marginTop: "3px",
                    }}
                  />
                  <Text style={{ fontSize: "30px" }}>Username</Text>
                  <div
                    className="flex flex-row wordHolder"
                    style={{
                      position: "relative",
                      marginLeft: "255px",
                    }}
                  >
                    <Text
                      className="body_font"
                      style={{ margin: "auto", textAlign: "center" }}
                    >
                      {checkData.username}
                    </Text>
                  </div>
                </div>
                <div className="flex flex-row mt-3">
                  <Image
                    src={EditIcon}
                    alt="user-icon"
                    style={{
                      width: "40px",
                      height: "40px",
                      marginRight: "25px",
                      marginTop: "3px",
                    }}
                  />
                  <Text style={{ fontSize: "30px" }}>Age</Text>
                  <div className="flex flex-col">
                    <div
                      className="flex flex-row wordHolder"
                      style={{
                        position: "relative",
                        marginLeft: "345px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text className="body_font">{checkData.age}</Text>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row mt-3">
                  <Image
                    src={EditIcon}
                    alt="user-icon"
                    style={{
                      width: "40px",
                      height: "40px",
                      marginRight: "25px",
                      marginTop: "3px",
                    }}
                  />
                  <Text style={{ fontSize: "30px" }}>Gender</Text>
                  <div className="flex flex-col">
                    <div
                      className="flex flex-row wordHolder"
                      style={{
                        position: "relative",
                        marginLeft: "295px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text className="body_font">{checkData.gender}</Text>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row mt-3">
                  <Image
                    src={EditIcon}
                    alt="user-icon"
                    style={{
                      width: "40px",
                      height: "40px",
                      marginRight: "25px",
                      marginTop: "3px",
                    }}
                  />
                  <Text style={{ fontSize: "30px" }}>
                    Chat Language Preference
                  </Text>
                  <div className="flex flex-col">
                    <div
                      className="flex flex-row wordHolder"
                      style={{
                        position: "relative",
                        marginLeft: "25px",
                      }}
                    >
                      <Text
                        className="body_font"
                        style={{ margin: "auto", textAlign: "center" }}
                      >
                        {checkData.chatPreference}
                      </Text>
                    </div>
                  </div>
                </div>
              </>
            )}
        </div>

        <div className="flex flex-row mt-[5rem] mb-[1rem] justify-center ">
          <RectangleButton
            onClick={handleBack}
            text="Back"
            buttonStyle={{
              marginRight: "5rem",
              height: "60px",
              weight: "300px",
              shadow: "0px 4px 4px rgba(0, 0, 0, 0.5)",
            }}
          />
          <RectangleButton
            onClick={handleSave}
            text="Save"
            buttonStyle={{
              color: "red",
              height: "60px",
              weight: "300px",
              shadow: "0px 4px 4px rgba(0, 0, 0, 0.55)",
            }}
          />
          <RectangleButton
            onClick={handleDelete}
            text="Delete Account"
            buttonStyle={{
              marginLeft: "5rem",
              height: "60px",
              weight: "300px",
              shadow: "0px 4px 4px rgba(0, 0, 0, 0.55)",
            }}
          />
        </div>
      </div>
    </ProfileContainer>
  );
}
