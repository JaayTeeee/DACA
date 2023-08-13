import { Text } from "@/public/styles/chakra";
import "../../globals.css";
import LogoContainer from "./logo";
export default function welcomePage() {
  return (
    <LogoContainer>
      <Text className="daca-font ml-2" style={{ marginTop: "-20px" }} fontSize="90px">
        DACA
      </Text>
      <Text className="daca-font ml-3" style={{ marginTop: "-30px" }} fontSize="9px">
        Decentralized | Anonymity | Desctructive
      </Text>
      <Text className="daca-font" style={{ marginBottom: "-700px", marginRight: "-1300px"}} fontSize="75px">
        WELCOME BACK,
      </Text>
    </LogoContainer>
  );
}

