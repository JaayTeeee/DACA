import "../../globals.css";
import React from 'react';
import Image from "next/image";

export default function LogoContainer({ children }: { children: any }) {
  return (
      <div
        className="h-screen w-screen"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <div className="flex">
          <div
            style={{ position: "absolute", textAlign: "center" }}
          >
            {children}

            <div
              className="circle"
              style={{
                position: "absolute",
                top: "20px",
                right: "-1300px",
              }}
            >
             <div
              className="circle"
              style={{
                position: "absolute",
                top: "20px",
                right: "-1220px",
              }}
            />
            <div
              className="circle"
              style={{
                position: "absolute",
                top: "20px",
                right: "-1140px",
              }}
            />
            <div
              className="rectangle2"
              style={{
                position: "absolute",
                bottom: "-1000px",
                left: "-780px",
              }}
            />
            <div
              className="rectangle3"
              style={{
                position: "absolute",
                bottom: "-1090px",
                left: "-890px",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
