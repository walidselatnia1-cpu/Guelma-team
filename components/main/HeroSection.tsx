import React from "react";
import { socialLinks } from "../../data/socialLinks";

interface HeroSectionProps {
  className?: string;
}

export default function HeroSection({ className }: HeroSectionProps) {
  return (
    <section
      className={`relative box-border mb-[51.2px] py-[51.2px] before:accent-auto before:bg-stone-100 before:box-border before:text-black before:block before:text-[19.2px] before:not-italic before:normal-nums before:font-normal before:h-full before:tracking-[normal] before:leading-[30.72px] before:list-outside before:list-disc before:absolute before:text-start before:indent-[0px] before:normal-case before:visible before:w-full before:z-[-1] before:border-separate before:left-0 before:top-0 before:font-system_ui ${
        className || ""
      }`}
    >
      <div className="text-neutral-900 box-border gap-x-[25.6px] flex flex-col max-w-[720px] gap-y-[25.6px] text-center mx-auto px-4 md:px-0">
        <h1 className="text-[34.56px] font-black box-border leading-[41.472px] uppercase md:text-[51.84px] md:leading-[62.208px]">
          Homemade Delights For Your Family Table 🍳
        </h1>

        <p className="text-[13.44px] box-border leading-[21.504px] md:text-[17.28px] md:leading-[27.648px]">
          Where everyday cooking at Recipes by Clare transforms into family joy!
          👩‍🍳 Our approachable recipes guide you through each step to create
          mouthwatering meals. You don't need to be a professional chef with our
          basic ingredients and clear instructions success comes naturally. From
          starters to sweet treats, we offer recipes that gather loved ones
          around homemade food anyone can prepare.
        </p>

        <div className="box-border gap-x-4 flex flex-col justify-center gap-y-4">
          <div className="items-center box-border gap-x-4 flex flex-wrap justify-center gap-y-4">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                title={link.title}
                className="text-white items-center bg-black box-border flex h-6 justify-center w-6 rounded-[50%] transition-transform duration-300 hover:scale-110"
              >
                <svg className="w-4 h-4">
                  <use href={"/symbols-v4.svg?#" + link.id}></use>
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
