"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { navigationItems } from "@/data/navigation";
import { siteConfig } from "@/config/site";
import Icon from "@/components/Icon";
import Logo from "@/components/Logo";

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const isAdmin = segments[segments.length - 1] === "admin";
  if (isAdmin) {
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
        <nav className="flex items-center justify-between py-5">
          {/* Logo */}
          <a
            href="/"
            title={siteConfig.description}
            className="flex items-center flex-shrink-0"
          >
            <Logo className="h-10 sm:h-12 lg:h-14 xl:h-16 leading-none" />
          </a>

          {/* Desktop Nav - Full labels on XL screens */}
          <ul className="items-center hidden xl:flex gap-x-3 flex-shrink-0">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  title={item.title}
                  className={`relative text-neutral-900 font-bold inline-flex items-center gap-x-1.5 p-2 rounded-[32px] xl:px-3 2xl:px-4 transition whitespace-nowrap ${
                    isActive(item.href)
                      ? "bg-gray-300" // Persistent active state
                      : "hover:bg-gray-300" // Only hover when not active
                  }`}
                >
                  <Icon name={item.iconSrc} size={19} className="text-black" />

                  {item.label && (
                    <span className="text-sm xl:text-base">{item.label}</span>
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Tablet Nav - Icons only on large screens */}
          <ul className="items-center hidden lg:flex xl:hidden gap-x-2 flex-shrink-0">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  title={item.title}
                  className={`relative inline-flex items-center justify-center p-3 rounded-full transition ${
                    isActive(item.href)
                      ? "bg-gray-300" // Persistent active state
                      : "hover:bg-gray-300" // Only hover when not active
                  }`}
                >
                  <Icon name={item.iconSrc} size={19} className="text-black" />
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Full-Screen Menu */}
          <details className="lg:hidden relative flex-shrink-0">
            <summary
              aria-label="Toggle Mobile Menu"
              className="list-none cursor-pointer inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-300"
            >
              <Icon name="menu" size={32} className="text-black" />
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
                  <Icon name="close" size={24} className="text-black" />
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
                        <Icon
                          name={item.iconSrc}
                          size={16}
                          className="text-black"
                        />
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
