"use client";

import "../globals.css";
export default function ProfileContainer({ children }: { children: any }) {
  return (
    <div
      className="h-screen w-screen"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
        }}
      >
        <div>
          <div style={{ position: "relative", textAlign: "center" }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
