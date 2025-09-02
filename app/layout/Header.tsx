"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { navigationItems } from "@/data/navigation";

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const isAdmin = segments[segments.length - 1] === "admin";
  const isMedia = segments[segments.length - 2] === "media";

  if (isAdmin || isMedia) {
    return <></>;
  }

  // Function to check if a navigation item is active
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`relative bg-white shadow-[rgba(0,0,0,0.16)_0px_1px_1px_0px] box-border w-full ${
        className || ""
      }`}
    >
      <div className="relative max-w-full w-full mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            title="Family-Friendly Recipes That Everyone Will Love"
            className="flex items-center py-2 min-w-[90px]"
          >
            <img
              src="https://c.animaapp.com/mer35j4wJPAxku/assets/logo.svg"
              alt="Recipes by Clare"
              className="h-[50px] md:h-[70px] max-w-full"
            />
          </a>

          {/* Desktop Nav */}
          <ul className="items-center hidden md:flex gap-x-4">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  title={item.title}
                  className={`relative text-neutral-900 font-bold inline-flex items-center gap-x-1.5 p-2 rounded-[32px] md:px-4 transition ${
                    isActive(item.href)
                      ? "bg-gray-300" // Persistent active state
                      : "hover:bg-gray-300" // Only hover when not active
                  }`}
                >
                  <svg className="h-4 w-4 text-black" aria-hidden="true">
                    <use href={item.iconSrc} />
                  </svg>
                  {item.label && <span>{item.label}</span>}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Full-Screen Menu */}
          <details className="md:hidden relative">
            <summary
              aria-label="Toggle Mobile Menu"
              className="list-none cursor-pointer inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-300"
            >
              <svg className="h-8 w-8 text-black" aria-hidden="true">
                <use href="/symbols-v4.svg#menu" />
              </svg>
            </summary>

            <div className="fixed inset-0 bg-white z-50 flex flex-col">
              {/* Header with close button */}
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-semibold">Menu</h2>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    const details = e.currentTarget.closest("details");
                    if (details) details.removeAttribute("open");
                  }}
                  className="inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-300"
                  aria-label="Close Menu"
                >
                  <svg className="h-6 w-6 text-black" aria-hidden="true">
                    <use href="/symbols-v4.svg#close" />
                  </svg>
                </button>
              </div>

              {/* Navigation items */}
              <div className="flex-1 overflow-y-auto">
                <ul className="flex flex-col p-4 gap-y-2">
                  {navigationItems.map((item) => (
                    <li key={item.id}>
                      <a
                        href={item.href}
                        title={item.title}
                        className={`flex items-center gap-x-3 p-4 rounded-lg transition text-lg ${
                          isActive(item.href)
                            ? "bg-gray-300" // Persistent active state for mobile
                            : "hover:bg-gray-300" // Only hover when not active
                        }`}
                        onClick={() => {
                          // Close the menu when a link is clicked
                          const details =
                            document.querySelector("details[open]");
                          if (details) details.removeAttribute("open");
                        }}
                      >
                        <svg className="h-4 w-4 text-black" aria-hidden="true">
                          <use href={item.iconSrc} />
                        </svg>
                        {item.label && <span>{item.label}</span>}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </details>
        </nav>
      </div>
    </header>
  );
}
