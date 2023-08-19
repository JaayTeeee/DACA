"use client";

import "../globals.css";
export default function LogoContainer({ children }: { children: any }) {
  return (
    <div
      style={{
        position: "absolute",
        overflow: "hidden",
        width: "100%",
        height: "100vh",
      }}
    >
      <div>
        <div style={{ position: "absolute", textAlign: "center" }}>
          {children}

          <div
            className="rectangle2"
            style={{
              position: "absolute",
              bottom: "-630px",
              left: "-780px",
            }}
          />
          <div
            className="rectangle3"
            style={{
              position: "absolute",
              bottom: "-730px",
              left: "-890px",
            }}
          />
        </div>
      </div>
    </div>
  );
}
