import { CircleButton } from "@/public/component/CircleButton";
import HelpIcon from "@/public/component/icons/icons8-help-50.png";
import UserIcon from "@/public/component/icons/icons8-user-50.png";
import { Text } from "@/public/styles/chakra";
import "../../globals.css";
import LogoContainer from "./logo";
export default function welcomePage() {
  return (
    <LogoContainer>
      <div className="flex">
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
        <div className="flex mt-5" style={{ marginLeft: "1150px" }}>
          <CircleButton imgSrc={HelpIcon} desc="help-icon" />
          <CircleButton imgSrc={UserIcon} desc="user-icon" />
        </div>
      </div>

      <div>
        <Text
          className="daca-font"
          style={{
            alignContent: "center",
            marginBottom: "-700px",
            marginLeft: "50px",
            marginTop: "50px",
          }}
          fontSize="75px"
        >
          WELCOME BACK,
        </Text>
      </div>
    </LogoContainer>
  );
}
