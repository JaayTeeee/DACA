import { Text } from "../../../public/styles/chakra";
import "../../globals.css";

const ChatInterface = ({ children }: { children: any }) => {
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
          </div>
          <div
            className="flex flex-col box mt-2"
            style={{ borderRadius: "10px" }}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatInterface;
