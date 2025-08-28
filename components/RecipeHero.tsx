"use client";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User } from "lucide-react";
import SocialShareButtons from "./Share";
import Recipe from "@/outils/types";
import React from "react";

/* -------------------- Breadcrumbs -------------------- */
import { usePathname } from "next/navigation";
import SearchBox from "./SearchBox";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <ol className="breadcrumb flex flex-wrap items-center text-xs font-normal">
      {/* Home link */}
      <li className="breadcrumb__item after:content-['>>'] after:px-2 last:after:content-none">
        <Link href="/" className="text-[#c64118] font-bold no-underline">
          Home
        </Link>
      </li>

      {segments.map((seg, idx) => {
        const href = "/" + segments.slice(0, idx + 1).join("/");
        const isLast = idx === segments.length - 1;
        const label =
          seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " ");

        return (
          <li
            key={href}
            className="breadcrumb__item after:content-['>>'] after:px-2 last:after:content-none"
          >
            {isLast ? (
              <span className="font-bold">{label}</span>
            ) : (
              <Link
                href={href}
                className="text-[#c64118] font-bold no-underline"
              >
                {label}
              </Link>
            )}
          </li>
        );
      })}
    </ol>
  );
}

/* -------------------- Recipe Hero -------------------- */
export function RecipeHero({ recipe }: { recipe: Recipe }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const isExplore = segments[segments.length - 1] === "explore";
  const isSearch = segments[segments.length - 1] === "search";
  if (isExplore)
    return (
      <>
        <div className=" bg-stone-100 space-y-6">
          {/* Title Section */}
          <nav>
            <Breadcrumbs />
          </nav>

          <div className="space-y-4">
            <h1 className="leading-tight text-5xl text-black">Explore</h1>

            <div className="text-[calc(var(--mo-font-size)*.8)] ">
              Find your next favorite meal with our diverse recipe collection!
              From quick weeknight dinners to impressive holiday feasts, we've
              got culinary inspiration for every cooking level and occasion.
            </div>

            <p className="text-xs">
              2792 results in this collection. Page 1 Of 311
            </p>
          </div>
        </div>
      </>
    );

  if (isSearch)
    return (
      <>
        <div className=" bg-stone-100 space-y-6">
          {/* Title Section */}
          <nav>
            <Breadcrumbs />
          </nav>

          <SearchBox />

          <div className="space-y-4">
            <div className="text-[calc(var(--mo-font-size)*.8)] ">
              Looking for the perfect recipe? Recipes by Clare has you covered!
              Search through our extensive collection of family-friendly dishes
              and uncover new meal inspiration for any day of the week.
            </div>
          </div>
        </div>
      </>
    );

  return (
    <div className=" bg-stone-100 space-y-6">
      {/* Breadcrumbs */}
      <nav>
        <Breadcrumbs />
      </nav>

      {/* Title Section */}
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          {recipe.title}
        </h1>

        <p className="text-sm text-gray-600">
          {recipe.featuredText}{" "}
          <Link
            href={recipe.categoryLink}
            className="text-orange-600 hover:underline"
          >
            {recipe.category}
          </Link>
          .
        </p>

        <p className="text-[calc(var(--mo-font-size)*.8)] text-gray-700 leading-relaxed">
          {recipe.description}
        </p>
      </div>

      {/* Social Share Buttons */}
      <SocialShareButtons />

      {/* Author Info */}
      <div className="flex items-center space-x-3 py-4">
        <Image
          src={recipe.author.avatar}
          alt={recipe.author.name}
          width={60}
          height={60}
          className="rounded-[50%] w-12 h-12 object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <User className="h-4 w-4" />
            <span>By</span>
            <Link
              href={recipe.author.link}
              className="text-green-600 font-medium hover:underline"
            >
              {recipe.author.name}
            </Link>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
            <Calendar className="h-4 w-4" />
            <span>Updated on {formatDate(recipe.updatedDate)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
