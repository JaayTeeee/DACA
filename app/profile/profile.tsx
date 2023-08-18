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

          <div
            className="greyContainer"
            style={{
              position: "relative",
              top:"-200px",
              left: "520px",
              zIndex: "-1",
            }}
          >          {children}
          </div>

          <div>{children}</div>
        </div>
      </div>
    </div>
    </div>
  );
}
