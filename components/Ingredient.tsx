"use client";
import { useState } from "react";
import { hasHtmlTags, renderSafeHtml } from "@/lib/utils";

const Ingredient = ({ ingredient, index: itemIndex }: any) => {
  const [clicked, setClicked] = useState(false);

  return (
    <>
      <li key={itemIndex} className="flex items-start">
        <span
          onClick={() => setClicked(!clicked)}
          className={`bg-[#18181b]  text-white relative rounded-md px-3 py-1 text-sm font-semibold mr-4 cursor-pointer whitespace-nowrap select-none transition-all duration-500 ${
            clicked
              ? " shadow-[0px_0_0_rgba(0,0,0,0.25)]  left-0 line-through"
              : " left-3  shadow-[-13px_0_0_rgba(0,0,0,0.25)]"
          }`}
        >
          {String(itemIndex + 1).padStart(2, "0")}
        </span>
        <span
          className={`recipe__interact-list-content text-black flex-1 leading-relaxed text-[19.2px] ${
            clicked ? "line-through" : ""
          }`}
        >
          {hasHtmlTags(ingredient) ? (
            <span dangerouslySetInnerHTML={renderSafeHtml(ingredient)} />
          ) : (
            ingredient
          )}
        </span>
      </li>
    </>
  );
};

export default Ingredient;
