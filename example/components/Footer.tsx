import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-16">
      {/* Author Section */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center border-2 border-gray-300 rounded-lg p-6 bg-white">
          <div className="flex justify-center mb-4">
            <Image
              src="https://ext.same-assets.com/3912301781/3427106349.svg"
              alt="Emily Smith"
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Emily Smith</h3>
          <p className="text-gray-600 mb-4">
            Food enthusiast sharing approachable recipes for home cooks of all
            skill levels.
          </p>

          <div className="flex justify-center space-x-4">
            <p className="text-sm font-medium text-gray-700">
              Follow us on social media
            </p>
          </div>

          <div className="flex justify-center space-x-4 mt-3">
            <Link
              href="#"
              className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors"
            >
              <Instagram className="h-4 w-4" />
            </Link>
            <Link
              href="#"
              className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors"
            >
              <Mail className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <nav className="flex flex-wrap justify-center items-center space-x-6 text-sm text-gray-600">
          <Link
            href="/"
            className="hover:text-green-600 transition-colors flex items-center space-x-1"
          >
            <span>🏠</span>
            <span>Home</span>
          </Link>
          <Link
            href="/authors"
            className="hover:text-green-600 transition-colors flex items-center space-x-1"
          >
            <span>👥</span>
            <span>Authors</span>
          </Link>
          <Link
            href="/categories"
            className="hover:text-green-600 transition-colors flex items-center space-x-1"
          >
            <span>📂</span>
            <span>Categories</span>
          </Link>
          <Link
            href="/explore"
            className="hover:text-green-600 transition-colors flex items-center space-x-1"
          >
            <span>🔍</span>
            <span>Explore</span>
          </Link>
          <Link
            href="/articles"
            className="hover:text-green-600 transition-colors flex items-center space-x-1"
          >
            <span>📄</span>
            <span>Articles</span>
          </Link>
          <Link
            href="/recipes"
            className="hover:text-green-600 transition-colors flex items-center space-x-1"
          >
            <span>🍽️</span>
            <span>Recipes</span>
          </Link>
          <Link
            href="/about"
            className="hover:text-green-600 transition-colors flex items-center space-x-1"
          >
            <span>ℹ️</span>
            <span>About</span>
          </Link>
          <Link
            href="/faq"
            className="hover:text-green-600 transition-colors flex items-center space-x-1"
          >
            <span>❓</span>
            <span>FAQs</span>
          </Link>
          <Link
            href="/privacy"
            className="hover:text-green-600 transition-colors flex items-center space-x-1"
          >
            <span>🔒</span>
            <span>Privacy Policy</span>
          </Link>
          <Link
            href="/terms"
            className="hover:text-green-600 transition-colors flex items-center space-x-1"
          >
            <span>📄</span>
            <span>Terms & Conditions</span>
          </Link>
          <Link
            href="/cookies"
            className="hover:text-green-600 transition-colors flex items-center space-x-1"
          >
            <span>🍪</span>
            <span>Cookie Policy</span>
          </Link>
          <Link
            href="/disclaimer"
            className="hover:text-green-600 transition-colors flex items-center space-x-1"
          >
            <span>⚠️</span>
            <span>Disclaimer</span>
          </Link>
          <Link
            href="/contact"
            className="hover:text-green-600 transition-colors flex items-center space-x-1"
          >
            <span>📧</span>
            <span>Contact</span>
          </Link>
          <Link
            href="/search"
            className="hover:text-green-600 transition-colors flex items-center space-x-1"
          >
            <span>🔍</span>
            <span>Search</span>
          </Link>
          <Link
            href="/sitemap"
            className="hover:text-green-600 transition-colors flex items-center space-x-1"
          >
            <span>🗺️</span>
            <span>Sitemap</span>
          </Link>
          <Link
            href="/feed"
            className="hover:text-green-600 transition-colors flex items-center space-x-1"
          >
            <span>📡</span>
            <span>Feed</span>
          </Link>
        </nav>
      </div>

      {/* Social Media Icons */}
      <div className="max-w-7xl mx-auto px-4 pb-6">
        <div className="flex justify-center space-x-4">
          <Link
            href="#"
            className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors"
          >
            <Facebook className="h-4 w-4" />
          </Link>
          <Link
            href="#"
            className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors"
          >
            <Instagram className="h-4 w-4" />
          </Link>
          <Link
            href="#"
            className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors"
          >
            <Mail className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center">
          <p className="text-sm text-gray-600">
            2025 Recipes by Clare. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 mt-1">V3.01</p>
        </div>
      </div>
    </footer>
  );
}
