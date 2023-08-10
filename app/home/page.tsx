import { Text } from "@/public/styles/chakra";
import "../globals.css";
import HomeContainer from "../page";
import { WalletButton } from "./WalletButton";
export default function HomePage() {
  return (
    <HomeContainer>
      <Text className="daca-font" fontSize="148px">
        DACA
      </Text>
      <Text className="daca-font" style={{ marginTop: "-40px" }}>
        Decentralized | Anonymity | Desctructive
      </Text>
      <WalletButton />
    </HomeContainer>
  );
}

