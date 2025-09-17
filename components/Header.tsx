"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className=" xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/placeholder-logo.svg"
              alt="Guelma Team Recipes"
              width={120}
              height={40}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-green-600 transition-colors flex items-center space-x-1"
            >
              <span>🏠</span>
              <span>Home</span>
            </Link>
            <Link
              href="/recipes"
              className="text-gray-700 hover:text-green-600 transition-colors flex items-center space-x-1"
            >
              <span>🍽️</span>
              <span>Recipes</span>
            </Link>
            <Link
              href="/categories"
              className="text-gray-700 hover:text-green-600 transition-colors flex items-center space-x-1"
            >
              <span>📂</span>
              <span>Categories</span>
            </Link>
            <Link
              href="/explore"
              className="text-gray-700 hover:text-green-600 transition-colors flex items-center space-x-1"
            >
              <span>🔍</span>
              <span>Explore</span>
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-green-600 transition-colors flex items-center space-x-1"
            >
              <span>ℹ️</span>
              <span>About</span>
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-green-600 transition-colors flex items-center space-x-1"
            >
              <span>📧</span>
              <span>Contact</span>
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
