import { Text } from "../../public/styles/chakra";
import "../globals.css";
import ChatButton from "./ChatButton";
const Chat = () => {
  return (
    <>
      <div
        className="flex flex-col"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <div className="flex flex-col items-center justify-center mt-2">
          <div
            className="flex flex-row justify-center "
            style={{ marginLeft: "700px" }}
          >
            <Text className="daca-font" fontSize="48px">
              DACA
            </Text>
            <div className="mt-2" style={{ marginLeft: "600px" }}>
              <ChatButton />
            </div>
          </div>
          <div className="box mt-2" style={{ borderRadius: "10px" }}></div>
        </div>
      </div>
    </>
  );
};

export default Chat;
