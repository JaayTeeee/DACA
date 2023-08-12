import "./globals.css";

export default function HomeContainer({ children }: { children: any }) {
  return (
    <>
      <div
        className="h-screen w-screen"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <div
          className="rectangle"
          style={{ position: "absolute", top: "-260px", left: "-180px" }}
        />
        <div className="flex items-center justify-center h-[80vh]">
          <div
            className="center"
            style={{ position: "absolute", textAlign: "center" }}
          >
            {children}

            <div
              className="rectangle2"
              style={{
                position: "absolute",
                bottom: "-560px",
                left: "-780px",
              }}
            />
            <div
              className="rectangle3"
              style={{
                position: "absolute",
                bottom: "-710px",
                left: "-890px",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
