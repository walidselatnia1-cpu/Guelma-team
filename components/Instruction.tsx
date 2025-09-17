"use client";

import { useState } from "react";

const Instruction = ({
  index,
  instruction,
}: {
  index: number;
  instruction: any;
}) => {
  const [clicked, setClicked] = useState(false);
  return (
    <div key={index} className="block items-start">
      <span
        onClick={() => setClicked(!clicked)}
        className={`bg-[#2E5F48] text-white relative rounded-md px-3 py-1 text-sm font-semibold mr-4 cursor-pointer whitespace-nowrap select-none transition-all duration-500 ${
          clicked
            ? " shadow-[0px_0_0_rgba(0,0,0,0.25)]  left-0 line-through"
            : " left-3  shadow-[-13px_0_0_rgba(0,0,0,0.25)]"
        }`}
      >
        Step {String(index + 1).padStart(2, "0")}
      </span>
      <br />
      <br />
      <p
        className={`recipe__interact-list-content text-black flex-1 leading-relaxed ${
          clicked ? "line-through" : ""
        }`}
      >
        {instruction.toString()}
      </p>
    </div>
  );
};

export default Instruction;
