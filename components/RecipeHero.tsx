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
export function RecipeHero({ recipe }: { recipe?: Recipe }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  console.log("RecipeHero pathname:", pathname);
  console.log("RecipeHero segments:", segments);
  console.log("RecipeHero recipe:", recipe?.title || "No recipe");

  const isExplore = segments[segments.length - 1] === "explore";
  const isSearch = segments[segments.length - 1] === "search";
  const isAbout = segments[segments.length - 1] === "about";
  const isContact = segments[segments.length - 1] === "contact";
  const isCategories = segments[segments.length - 1] === "categories";
  const isCategory = segments[segments.length - 2] === "categories";
  const isFaq = segments[segments.length - 1] === "faq";
  const isAllRecipes = segments[segments.length - 1] === "recipes";

  if (isAllRecipes)
    return (
      <>
        <div className="bg-stone-100 space-y-6 px-4 md:px-6">
          {/* Title Section */}
          <nav>
            <Breadcrumbs />
          </nav>

          <div className="space-y-4">
            <h1 className="leading-tight text-5xl text-black">All Recipes</h1>

            <div className="text-[calc(var(--mo-font-size)*.8)] ">
              Your one-stop recipe destination! Recipes by Clare offers
              everything from elaborate family feasts to simple personal treats,
              with plenty of delicious options waiting to inspire your next
              meal.
            </div>
          </div>
          <div className="landing__media hidden md:block">
            <svg width="160" height="160" className="">
              <use href="/symbols-v4.svg?#recipes"></use>
            </svg>
          </div>
        </div>
      </>
    );
  if (isExplore)
    return (
      <>
        <div className="bg-stone-100 space-y-6 px-4 md:px-6">
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
        <div className="bg-stone-100 space-y-6 px-4 md:px-6">
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
  if (isCategory)
    return (
      <>
        <div className="bg-stone-100 space-y-6 px-4 md:px-6">
          {/* Title Section */}
          <nav>
            <Breadcrumbs />
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            {"Tasty Evening Meals"}
          </h1>
          <div className="space-y-4">
            <div className="text-[calc(var(--mo-font-size)*.8)] ">
              Make every dinner special with our Evening Meals collection.
              Whether you’re looking for a quick weeknight meal or a dish to
              impress, we’ve got recipes that will satisfy every craving.
              Perfect for family dinners or a cozy night in.
            </div>
            <p className="text-xs">
              110 results in this collection. (Page 1 Of 10) Updated on Mon, 20
              Jan 2025 17:25:36 GMT
            </p>
          </div>
        </div>
      </>
    );
  if (isAbout)
    return (
      <div className="flex flex-col md:flex-row md:justify-between px-4 md:px-6">
        <div className="bg-stone-100 space-y-6 flex-1">
          <>
            <nav>
              <Breadcrumbs />
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {"About"}
            </h1>

            <div className="space-y-4">
              <div className="text-[calc(var(--mo-font-size)*.8)] ">
                Recipes by Clare offers a treasure trove of balanced, simple
                recipes designed to bring families together in the kitchen and
                create meaningful mealtime experiences.
              </div>
            </div>
          </>
        </div>

        <div className="landing__media hidden md:block md:flex-shrink-0">
          <svg width="160" height="160" className="">
            <use href="/symbols-v4.svg?#about"></use>
          </svg>
        </div>
      </div>
    );

  if (isContact)
    return (
      <div className="flex flex-col md:flex-row md:justify-between px-4 md:px-6">
        <div className="bg-stone-100 space-y-6 flex-1">
          <>
            <nav>
              <Breadcrumbs />
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {"Let's connect"}
            </h1>

            <div className="space-y-4">
              <div className="text-[calc(var(--mo-font-size)*.8)] ">
                Whether you need cooking advice, want to share feedback, or
                simply want to say hello, feel free to drop me a line! I'm
                always excited to discuss delicious recipes with you.
              </div>
            </div>
          </>
        </div>

        <div className="landing__media hidden md:block md:flex-shrink-0">
          <svg width="160" height="160" className="">
            <use href="/symbols-v4.svg?#contact"></use>
          </svg>
        </div>
      </div>
    );
  if (isCategories)
    return (
      <div className="flex flex-col md:flex-row md:justify-between px-4 md:px-6">
        <div className="bg-stone-100 space-y-6 flex-1">
          <>
            <nav>
              <Breadcrumbs />
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {"All Categories"}
            </h1>

            <div className="space-y-4">
              <div className="text-[calc(var(--mo-font-size)*.8)] ">
                Looking for culinary inspiration? Browse through our diverse
                recipe categories to find the perfect dish for any occasion.
                We've got everything from quick weeknight dinners to impressive
                weekend feasts!
              </div>
            </div>
          </>
        </div>

        <div className="landing__media hidden md:block md:flex-shrink-0">
          <svg width="160" height="160" className="">
            <use href="/symbols-v4.svg?#categories"></use>
          </svg>
        </div>
      </div>
    );
  if (isFaq)
    return (
      <div className="flex flex-col md:flex-row md:justify-between px-4 md:px-6">
        <div className="bg-stone-100 space-y-6 flex-1">
          <>
            <nav>
              <Breadcrumbs />
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {"Frequently Asked Questions"}
            </h1>

            <div className="space-y-4">
              <div className="text-[calc(var(--mo-font-size)*.8)] ">
                Need help with something? We've got you covered! Browse our FAQ
                section for answers to common questions about our recipes,
                cooking methods, and kitchen hacks.
              </div>
            </div>
          </>
        </div>

        <div className="landing__media hidden md:block md:flex-shrink-0">
          <svg width="160" height="160" className="">
            <use href="/symbols-v4.svg?#faq"></use>
          </svg>
        </div>
      </div>
    );

  return (
    <div className="bg-stone-100 space-y-2 px-4 md:px-6">
      {/* Breadcrumbs */}
      <nav>
        <Breadcrumbs />
      </nav>

      {/* Title Section */}
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          {recipe?.title}
        </h1>

        <p className="text-sm text-gray-600">
          {recipe?.featuredText}{" "}
          <Link
            href={recipe?.categoryLink || "#"}
            className="text-orange-600 hover:underline"
          >
            {recipe?.category}
          </Link>
          .
        </p>

        <p className="text-[calc(var(--mo-font-size))] text-gray-700 leading-relaxed">
          {recipe?.description}
        </p>
      </div>

      {/* Social Share Buttons */}
      <SocialShareButtons />

      {/* Author Info */}
      <div className="flex items-center space-x-3 py-4">
        <Image
          src={
            recipe?.heroImage ||
            recipe?.author?.avatar ||
            "/placeholder-user.jpg"
          }
          alt={recipe?.author?.name || "Author"}
          width={60}
          height={60}
          className="rounded-[50%] w-12 h-12 object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <User className="h-4 w-4" />
            <span>By</span>
            <Link
              href={recipe?.author?.link || "#"}
              className="text-green-600 font-medium hover:underline"
            >
              {recipe?.author?.name || "Unknown Author"}
            </Link>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
            <Calendar className="h-4 w-4" />
            <span>
              Updated on{" "}
              {recipe?.updatedDate
                ? formatDate(recipe.updatedDate)
                : "Unknown date"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
