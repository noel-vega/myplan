import React, { useState } from "react";

const Switch = () => {
  const [isComplete, setIsComplete] = useState(false);

  const handleCheckboxChange = () => {
    setIsComplete(!isComplete);
  };

  return (
    <>
      <label
        className="flex cursor-pointer select-none items-center"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="relative">
          <input
            type="checkbox"
            checked={isComplete}
            onChange={handleCheckboxChange}
            className="sr-only"
          />
          <div
            className={`box block h-8 w-14 rounded-full ${
              isComplete ? "bg-green-400" : "bg-red-400"
            }`}
          />
          <div
            className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${
              isComplete ? "translate-x-full" : ""
            }`}
          />
        </div>
      </label>
    </>
  );
};

export default Switch;
