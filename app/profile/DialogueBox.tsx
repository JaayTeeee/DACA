"use client";

import { useEffect, useState } from "react";

type OnResultCallback = (result: string) => void;

export const DialogueBox = ({ onResult }: { onResult: OnResultCallback }) => {
  const [result, setResult] = useState<string | null>(null);

  const handleYesClick = () => {
    setResult("Yes");
  };

  const handleNoClick = () => {
    setResult("No");
  };

  useEffect(() => {
    if (result !== null) {
      onResult(result);
    }
  }, [result, onResult]);

  return (
    <div id="myDialog" className="dialog">
      <div className="daca-font dialog-content">
        <p>Are you sure?</p>
        <div className="dialog-buttons">
          <button
            className="button"
            id="Yes"
            style={{ marginRight: "40px", width: "20%", color: "white" }}
            onClick={handleYesClick}
          >
            Yes
          </button>
          <button
            className="button"
            id="No"
            style={{ marginLeft: "40px", width: "20%", color: "white" }}
            onClick={handleNoClick}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};
