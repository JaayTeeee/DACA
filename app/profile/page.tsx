"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Text } from "@/public/styles/chakra";
import ProfileContainer from "./profile";
import { RectangleButton } from "@/public/component/RectangleButton";
import EditIcon from "@/public/component/icons/icons8-edit-50.png";
import UserIcon from "@/public/component/icons/icons8-user-100.png";

interface updatedUserData {
  username: string;
  gender: string;
  age: number;
  chatPreference: string;
}

export default function profilePage() {
  const [address, setAddress] = useState<string | null>(null);
  const [checkData, setCheckData] = useState<{
    success: boolean;
    username?: string;
    age?: number;
    gender?: string;
    chatPreference?: string;
  } | null>(null);

  const [updatedData, updateUserData] = useState<updatedUserData>({
    username: "",
    gender: "",
    age: checkData?.age || 0,
    chatPreference: "",
  });

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

  const setUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    updateUserData((prevUserData) => ({
      ...prevUserData,
      username: newName,
    }));
  };

  const setGender = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newGender = event.target.value;
    updateUserData((prevUserData) => ({
      ...prevUserData,
      gender: newGender,
    }));
  };

  const setAge = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAge = parseInt(event.target.value);
    updateUserData((prevUserData) => ({
      ...prevUserData,
      age: newAge,
    }));
  };

  const setChatPreference = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newChatLanguage = event.target.value;
    updateUserData((prevUserData) => ({
      ...prevUserData,
      chatPreference: newChatLanguage,
    }));
  };

  const router = useRouter();

  const handleBack = () => {
    if (address !== null) {
      const encodedAddress = encodeURIComponent(address);
      router.push(`/welcome?address=${encodedAddress}`);
    }
  };

  const handleSave = () => {
    const newUserData = {
      username: updatedData.username || (checkData?.username || ""),
      gender: updatedData.gender || (checkData?.gender || ""),
      age: updatedData.age || (checkData?.age || 0),
      chatPreference:
        updatedData.chatPreference || (checkData?.chatPreference || ""),
    };

    async function updateData() {
      try {
        const updateRequest = new Request(
          "http://localhost:3001/api/updateData",
          {
            method: "POST",
            headers: new Headers({
              "Content-Type": "application/json",
              Accept: "application/json",
            }),
            mode: "cors",
            body: JSON.stringify(newUserData),
          }
        );

        const updateResponse = await fetch(updateRequest);
        const updateData = await updateResponse.json();

        if (updateResponse.ok && updateData.success) {
          console.log(updateData);
        } else {
          console.error("Failed to update user data", updateRequest);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    if (
      updatedData?.age !== checkData?.age ||
      updatedData?.username !== checkData?.username ||
      updatedData?.gender !== checkData?.gender ||
      updatedData?.chatPreference !== checkData?.chatPreference
    ) {
      updateData();
    }
  };

  const handleDelete = () => {
    async function deleteData() {
      try {
        const deleteRequest = new Request(
          "http://localhost:3001/api/deleteAcc",
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

        const deleteResponse = await fetch(deleteRequest);
        const deleteData = await deleteResponse.json();

        if (deleteResponse.ok && deleteData.success) {
          console.log(deleteData);
        } else {
          console.error("Failed to delete account", deleteResponse);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
      router.push("/home");
    }

    if (address) {
      deleteData();
    }
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

                  <form
                    style={{
                      position: "relative",
                      marginLeft: "255px",
                    }}
                  >
                    <input
                      className="wordHolder"
                      type="text"
                      style={{
                        outlineColor: "#EAEAEA",
                        alignContent: "center",
                        opacity: 0.9,
                        textAlign: "center",
                        marginRight: "200px",
                      }}
                      placeholder={checkData.username || ''}
                      onChange={setUsername}
                      value={updatedData?.username}
                      required
                    />
                  </form>
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
                    <form
                      style={{
                        position: "relative",
                        marginLeft: "345px",
                      }}
                    >
                      <input
                        className="wordHolder"
                        type="number"
                        style={{
                          outlineColor: "#EAEAEA",
                          alignContent: "center",
                          opacity: 0.9,
                          textAlign: "center",
                          textIndent: "10px",
                        }}
                        placeholder={checkData.age.toString() || ''}
                        min={1}
                        onChange={setAge}
                        value={updatedData?.age}
                        required
                      />
                    </form>
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
                    <form
                      style={{
                        position: "relative",
                        marginLeft: "295px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <select
                        className="wordHolder"
                        style={{
                          outlineColor: "#EAEAEA",
                          textIndent: "10px",
                          textAlign: "center",
                          color: "rgba(0, 0, 0, 0.5)",
                        }}
                        onChange={setGender}
                        value={updatedData?.gender}
                        required
                      >
                        <option value="" disabled selected hidden>
                          {checkData.gender || "Select Gender"}
                        </option>{" "}
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-binary">Non-Binary</option>
                        <option value="Prefer-not-to-disclose">
                          Prefer Not to Disclose
                        </option>
                      </select>
                    </form>
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
                    <form
                      style={{
                        position: "relative",
                        marginLeft: "25px",
                      }}
                    >
                      <select
                        className="wordHolder"
                        style={{
                          outlineColor: "#EAEAEA",
                          textIndent: "10px",
                          textAlign: "center",
                          color: "rgba(0, 0, 0, 0.5)",
                        }}
                        onChange={setChatPreference}
                        value={updatedData?.chatPreference}
                        required
                      >
                        <option value="" disabled selected hidden>
                          {checkData.chatPreference || "Select Chat Language"}
                        </option>
                        <option value="English">English (default)</option>
                        <option value="Mandarin">Mandarin</option>
                        <option value="Japanese">Japanese</option>
                        <option value="Spanish">Spanish</option>
                        <option value="Malay">Malay </option>
                      </select>
                    </form>
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
