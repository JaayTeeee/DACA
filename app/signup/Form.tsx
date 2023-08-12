"use client";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Text } from "../../public/styles/chakra";

const InputForm = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(0);
  const [showGender, setShowGender] = useState(false);
  const [showAge, setShowAge] = useState(false);
  const [redirectTo, setRedirectTo] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(event.target.value);
  };

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const ageValue = parseInt(event.target.value);
    setAge(isNaN(ageValue) ? 0 : ageValue);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!showGender) {
      setShowGender(true);
    } else {
      if (age === 0) {
        setShowAge(true);
      } else {
        setLoading(true);
        try {
          // await pass data to database
          setLoading(false);
          setRedirectTo("/welcome");
        } catch (error) {
          console.error("Failed to save data:", error);
        }
      }
    }
  };

  if (redirectTo) {
    redirect("/welcome");
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
                  value={name}
                  onChange={handleNameChange}
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
                value={gender}
                onChange={handleGenderChange}
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
                value={age}
                onChange={handleAgeChange}
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
