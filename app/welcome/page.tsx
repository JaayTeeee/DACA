import { Text } from "@/public/styles/chakra";
import "../globals.css";
import { RedirectToChatButton, TopThreeButtons } from "./WelcomePageButton";
import LogoContainer from "./logo";
import CheckUsername from "./functions";

export default function welcomePage() {
  return (
    <>
      <LogoContainer>
        <div className="flex flex-row">
          <div className="flex-col">
            <Text
              className="daca-font ml-2"
              style={{ marginTop: "-20px" }}
              fontSize="90px"
            >
              DACA
            </Text>
            <Text
              className="daca-font ml-3"
              style={{ marginTop: "-30px" }}
              fontSize="9px"
            >
              Decentralized | Anonymity | Desctructive
            </Text>
          </div>
          <div className="flex mt-5" style={{ marginLeft: "1080px" }}>
            <TopThreeButtons />
          </div>
        </div>

        <div className="flex flex-col" style={{ marginLeft: "50px" }}>
          <Text
            className="daca-font flex-row"
            style={{ marginTop: "70px" }}
            fontSize="75px"
          >
            WELCOME BACK, {<CheckUsername />}
          </Text>
          <RedirectToChatButton />
        </div>
      </LogoContainer>
    </>
  );
}
