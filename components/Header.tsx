"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="https://ext.same-assets.com/3912301781/237098034.svg"
              alt="Recipes By Clare"
              width={120}
              height={40}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/recipes"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Recipes
            </Link>
            <Link
              href="/categories"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/explore"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Explore
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2">
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </div>
    </header>
  );
}
