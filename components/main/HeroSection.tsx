import React from "react";
import { socialLinks } from "../../data/socialLinks";

interface HeroSectionProps {
  className?: string;
}

export default function HeroSection({ className }: HeroSectionProps) {
  return (
    <section
      className={`relative box-border mb-[51.2px] py-[51.2px] bg-cover bg-center bg-no-repeat w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] ${
        className || ""
      }`}
      style={{
        backgroundImage: "url('/Hero Background .webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute z-[1] inset-0"></div>

      <div className="relative z-[2] text-black box-border gap-x-[25.6px] flex flex-col max-w-[720px] gap-y-[25.6px] text-center mx-auto px-4 md:px-0">
        <h1 className="text-[34.56px] font-black box-border leading-[41.472px] uppercase md:text-[51.84px] md:leading-[62.208px] drop-shadow-lg">
          Homemade Delights For Your Family Table 🍳
        </h1>

        <p className="text-[13.44px] box-border leading-[21.504px] md:text-[17.28px] md:leading-[27.648px] drop-shadow-md">
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
                className="text-white items-center bg-black/70 box-border flex h-9 justify-center w-9 rounded-[50%] transition-transform duration-300 hover:scale-110 hover:bg-black/90 backdrop-blur-sm"
              >
                <svg className={" text-white h-6 h-6"} aria-hidden="true">
                  <use href={`/symbols-v4.svg#${link.id}`} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
