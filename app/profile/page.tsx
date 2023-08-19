"use client";

import { RectangleButton } from "@/public/component/RectangleButton";
import EditIcon from "@/public/component/icons/icons8-edit-50.png";
import UserIcon from "@/public/component/icons/icons8-user-100.png";
import { Text } from "@/public/styles/chakra";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "../globals.css";
import ProfileContainer from "./profile";

export default function profilePage() {
  const router = useRouter();

  const handleCancel = () => {
    router.push("/welcome");
  };

  const handleSave = () => {
    console.log("Save button clicked");
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
              animation: "fadeIn 2s",
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
              style={{
                marginBottom: "25px",
                marginLeft: "10px",
                animation: "none",
              }}
            >
              PROFILE
            </Text>
          </div>
        </div>

        <div
          className="flex flex-col justify-start mt-[3rem] ml-[20rem]"
          style={{ animation: "fadeIn 2s" }}
        >
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
            <Text style={{ fontSize: "35px" }}>Username</Text>
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
            <Text style={{ fontSize: "35px" }}>Age</Text>
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
            <Text style={{ fontSize: "35px" }}>Gender</Text>
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
            <Text style={{ fontSize: "35px" }}>Chat Language Preference</Text>
          </div>
        </div>

        <div className="flex flex-row mt-[5rem] justify-center ">
          <RectangleButton
            onClick={handleCancel}
            text="Cancel"
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
