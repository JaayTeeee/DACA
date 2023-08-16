"use client";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { Text } from "../../public/styles/chakra";

interface UserData {
  username: string;
  gender: string;
  age: number;
}

const InputForm = () => {
  const [userData, setUserData] = useState<UserData>({
    username: '',
    gender: '',
    age: 0,
  });

  const [showGender, setShowGender] = useState(false);
  const [showAge, setShowAge] = useState(false);
  const [redirectTo, setRedirectTo] = useState("");
  const [isLoading, setLoading] = useState(false);

  const setUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setUserData((prevUserData) => ({
      ...prevUserData,
      username: newName,
    }));
  };

  const setGender = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newGender = event.target.value;
    setUserData((prevUserData) => ({
      ...prevUserData,
      gender: newGender,
    }));
  };

  const setAge = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAge = parseInt(event.target.value);
    setUserData((prevUserData) => ({
      ...prevUserData,
      age: newAge,
    }));
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!showGender) {
      setShowGender(true);
    } else {
      if (userData.age === 0) {
        setShowAge(true);
      } else {
        setLoading(true);
        try {
          const newUserdata: UserData = {
            username: userData.username,
            gender: userData.gender,
            age: userData.age,
          };

          const response = await fetch('signup/database', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUserdata),
          });

          if (response.ok) {
            setLoading(false);
            setRedirectTo("/welcome");
          } else {
            console.error('Failed to save data');
          }
        } catch (error) {
          console.error('Failed to save data:', error);
        }
      }
    }
  };

  if (redirectTo) {
    redirect('/welcome');
  }

  return (
    <>
      {!showAge && !showGender ? (
        <>
          <div className="delay-100">
            <Text
              className="daca-font text-shadow max-w-[700px]"
              fontSize="48px"
            >
              Welcome, how should we address you?
            </Text>
            <form
              onSubmit={handleFormSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#EAEAEA",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                padding: "0.5rem",
                borderRadius: "5px",
                marginTop: "20px",
              }}
            >
              <div className="flex flex-row justify-center">
                <input
                  type="text"
                  style={{
                    width: "550px",
                    height: "42px",
                    backgroundColor: "inherit",
                    outlineColor: "#EAEAEA",
                    opacity: 0.5,
                    textIndent: "10px",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                  value={userData.username}
                  onChange={setUsername}
                  placeholder="Your Name"
                  required
                />

                <button
                  type="submit"
                  className="mt-2"
                  style={{
                    width: "100px",
                    height: "44px",
                    borderRadius: "2px",
                    backgroundColor: "#2B4BC2",
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                >
                  <Text className="daca-font" fontSize="lg" color="white">
                    OK
                  </Text>
                </button>
              </div>
            </form>
            <Text className="daca-font mt-1" color="grey" align="left">
              Or press Enter to continue...
            </Text>
          </div>
        </>
      ) : !showAge ? (
        <div className="delay-100">
          <Text className="daca-font text-shadow max-w-[700px]" fontSize="48px">
            What is your gender?
          </Text>
          <form
            onSubmit={handleFormSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#EAEAEA",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              padding: "0.5rem",
              borderRadius: "5px",
              marginTop: "20px",
              marginBottom: "60px",
            }}
          >
            <div className="flex flex-row justify-center">
              <select
                style={{
                  width: "474px",
                  height: "42px",
                  backgroundColor: "inherit",
                  outlineColor: "#EAEAEA",
                  opacity: 0.5,
                  textIndent: "10px",
                  marginTop: "10px",
                }}
                value={userData.gender}
                onChange={setGender}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-Binary</option>
                <option value="prefer-not-to-disclose">
                  Prefer Not to Disclose
                </option>
              </select>
              <button
                type="submit"
                className="mt-2"
                style={{
                  width: "100px",
                  height: "44px",
                  borderRadius: "2px",
                  backgroundColor: "#2B4BC2",
                  cursor: "pointer",
                  marginLeft: "10px",
                }}
              >
                <Text className="daca-font" fontSize="lg" color="white">
                  OK
                </Text>
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="delay-100">
          <Text className="daca-font text-shadow max-w-[700px]" fontSize="48px">
            How old are you?
          </Text>

          <form
            onSubmit={handleFormSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#EAEAEA",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              padding: "0.5rem",
              borderRadius: "5px",
              marginTop: "20px",
              marginBottom: "60px",
            }}
          >
            <div className="flex flex-row justify-center">
              <input
                type="number"
                style={{
                  width: "474px",
                  height: "42px",
                  backgroundColor: "inherit",
                  outlineColor: "#EAEAEA",
                  opacity: 0.5,
                  textIndent: "10px",
                  marginTop: "10px",
                }}
                value={userData.age}
                onChange={setAge}
                placeholder="Your Age"
                min={1}
                required
              />
              <button
                type="submit"
                className="mt-2"
                style={{
                  width: "100px",
                  height: "44px",
                  borderRadius: "2px",
                  backgroundColor: "#2B4BC2",
                  cursor: "pointer",
                  marginLeft: "10px",
                }}
              >
                <Text className="daca-font" fontSize="lg" color="white">
                  OK
                </Text>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default InputForm;
