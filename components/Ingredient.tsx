"use client";
import { useState } from "react";

const Ingredient = ({ ingredient, index: itemIndex }: any) => {
  const [clicked, setClicked] = useState(false);

  return (
    <>
      <li key={itemIndex} className="flex items-start">
        <span
          onClick={() => setClicked(!clicked)}
          className={`bg-orange-100 text-orange-800 relative rounded-md px-3 py-1 text-sm font-semibold mr-4 cursor-pointer whitespace-nowrap select-none transition-all duration-500 ${
            clicked
              ? " shadow-[0px_0_0_rgba(0,0,0,0.25)]  left-0 line-through"
              : " left-3  shadow-[-13px_0_0_rgba(0,0,0,0.25)]"
          }`}
        >
          {String(itemIndex + 1).padStart(2, "0")}
        </span>
        <span
          className={`recipe__interact-list-content text-gray-700 flex-1 leading-relaxed ${
            clicked ? "line-through" : ""
          }`}
        >
          {ingredient}
        </span>
      </li>
    </>
  );
};

export default Ingredient;
