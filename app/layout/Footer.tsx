"use client";
import React from "react";
import { footerLinks } from "@/data/footerLinks";
import { socialLinks } from "@/data/socialLinks";

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer
      className={`items-center box-border gap-x-[25.6px] flex flex-col gap-y-[25.6px] my-[51.2px] ${
        className || ""
      }`}
    >
      <div className="relative bg-stone-100 box-border max-w-full outline-neutral-900 -outline-offset-8 outline-dashed outline-1 w-full p-8">
        <div className="relative box-border max-w-full w-full mx-auto px-4">
          <ul className="text-[15.36px] box-border gap-x-4 flex flex-wrap justify-center leading-[24.576px] gap-y-2 pl-0 md:text-[19.2px] md:leading-[30.72px]">
            {footerLinks.map((link) => (
              <li
                key={link.id}
                className="text-[15.36px] box-border flex leading-[24.576px] list-none text-left md:text-[19.2px] md:leading-[30.72px]"
              >
                <a
                  href={link.href}
                  title={link.title}
                  className={link.className}
                >
                  <img
                    src={link.iconSrc}
                    alt="Icon"
                    className="box-border shrink-0 h-[19.2px] w-[19.2px]"
                  />
                  <span className="text-[15.36px] box-border block leading-[24.576px] md:text-[19.2px] md:leading-[30.72px]">
                    {link.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="box-border">
        <div className="box-border gap-x-4 flex flex-col justify-center gap-y-4 text-center">
          <div className="items-center box-border gap-x-4 flex flex-wrap justify-center gap-y-4">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                title={link.title}
                className="text-blue-700 items-center bg-black box-border flex h-9 justify-center w-9 rounded-[50%]"
              >
                <img
                  src={link.iconSrc}
                  alt="Icon"
                  className="text-white box-border h-5 w-5"
                />
              </a>
            ))}
          </div>
        </div>

        <div className="text-neutral-900 text-[11.52px] font-bold box-border leading-[18.432px] text-center mt-[12.8px] md:text-[13.44px] md:leading-[21.504px]">
          <span className="text-[11.52px] box-border leading-[18.432px] md:text-[13.44px] md:leading-[21.504px]">
            2025 Recipes by Clare. All rights reserved.
          </span>
          <br className="text-[11.52px] box-border leading-[18.432px] md:text-[13.44px] md:leading-[21.504px]" />
          <span className="text-[11.52px] box-border leading-[18.432px] md:text-[13.44px] md:leading-[21.504px]">
            V3.01
          </span>
        </div>
      </div>
    </footer>
  );
}
