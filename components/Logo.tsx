import React from "react";
import { siteConfig } from "@/config/site";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <div
      className={`font-bold text-transparent bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text hover:from-orange-600 hover:via-red-600 hover:to-pink-600 transition-all duration-300 ${className}`}
      style={{
        fontFamily: '"Playfair Display", "Times New Roman", serif',
        fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
        lineHeight: "1.2",
        letterSpacing: "-0.02em",
        textShadow: "0 2px 4px rgba(0,0,0,0.1)",
        WebkitTextStroke: "0.5px rgba(255,255,255,0.1)",
      }}
    >
      {siteConfig.name}
    </div>
  );
}
