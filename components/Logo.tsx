import React from "react";
import { siteConfig } from "@/config/site";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <div
      className={`font-bold  text-black  ${className}`}
      style={{
        fontFamily: '"Playfair Display", "Times New Roman", serif',
        fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
        lineHeight: "1.2",
        letterSpacing: "-0.02em",
        WebkitTextStroke: "0.5px rgba(255,255,255,0.1)",
        alignContent: "center",
      }}
    >
      {siteConfig.name}
    </div>
  );
}
