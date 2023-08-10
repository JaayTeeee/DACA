import { Text } from "@/public/styles/chakra";
import "../globals.css";

export default function About() {
  return (
    <>
      <div
        className="h-screen w-screen"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <div
          className="rectangle"
          style={{ position: "absolute", top: "-260px", left: "-120px" }}
        />
        <div className="flex items-center justify-center h-[70vh]">
          <div
            className="center"
            style={{ position: "absolute", textAlign: "center" }}
          >
            <Text className="daca-font" fontSize="148px">
              DACA
            </Text>
            <Text className="daca-font" style={{ marginTop: "-40px" }}>
              Decentralized | Anonymity | Desctructive
            </Text>
            <div
              className="rectangle2"
              style={{
                position: "absolute",
                bottom: "-550px",
                left: "-780px",
              }}
            />
            <div
              className="rectangle3"
              style={{
                position: "absolute",
                bottom: "-680px",
                left: "-890px",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
