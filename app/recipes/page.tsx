import React from "react";
import { Recipe } from "@/outils/types";
import { notFound } from "next/navigation";
import { getRecipes } from "@/data/data";

const Pagination = ({ currentPage = 1, totalPages = 311 }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <nav className="flex justify-center mt-8">
      <ul className="flex gap-2 list-none p-0 m-0 text-sm">
        {/* First / Previous Arrow */}
        <li className="flex">
          {isFirstPage ? (
            <span className="px-3 py-2 rounded-2xl bg-gray-200 text-gray-600 cursor-not-allowed block">
              «
            </span>
          ) : (
            <a
              href="#"
              className="px-3 py-2 rounded-2xl bg-black text-white hover:bg-gray-800 transition-colors block"
            >
              «
            </a>
          )}
        </li>

        {/* Previous */}
        <li className="flex">
          {isFirstPage ? (
            <span className="px-3 py-2 rounded-2xl bg-gray-200 text-gray-600 cursor-not-allowed block">
              Previous
            </span>
          ) : (
            <a
              href="#"
              className="px-3 py-2 rounded-2xl bg-black text-white hover:bg-gray-800 transition-colors block"
            >
              Previous
            </a>
          )}
        </li>

        {/* Current Page */}
        <li className="flex">
          <span className="px-3 py-2 rounded-2xl bg-gray-200 text-gray-600 cursor-not-allowed block">
            {currentPage}
          </span>
        </li>

        {/* Next */}
        <li className="flex">
          {isLastPage ? (
            <span className="px-3 py-2 rounded-2xl bg-gray-200 text-gray-600 cursor-not-allowed block">
              Next
            </span>
          ) : (
            <a
              href="#"
              className="px-3 py-2 rounded-2xl bg-black text-white hover:bg-gray-800 transition-colors block"
            >
              Next
            </a>
          )}
        </li>

        {/* Last / Next Arrow */}
        <li className="flex">
          {isLastPage ? (
            <span className="px-3 py-2 rounded-2xl bg-gray-200 text-gray-600 cursor-not-allowed block">
              »
            </span>
          ) : (
            <a
              href="#"
              className="px-3 py-2 rounded-2xl bg-black text-white hover:bg-gray-800 transition-colors block"
            >
              »
            </a>
          )}
        </li>
      </ul>
    </nav>
  );
};

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col shadow-sm">
      {/* Smaller image height */}
      <a href={recipe.href} className="block w-full h-40 overflow-hidden">
        <img
          src={recipe.images[0]}
          alt={recipe.imageAlt || recipe.title}
          className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
        />
      </a>

      <div className="flex flex-col flex-1 gap-2 p-3">
        <a href={recipe.href} className="block">
          <h3 className="text-base font-semibold text-black hover:text-gray-700 transition-colors line-clamp-1">
            {recipe.title}
          </h3>
        </a>

        {/* Limit description length */}
        <p className="text-gray-600 text-sm leading-snug line-clamp-3">
          {recipe.description}
        </p>
      </div>

      <div className="px-3 pb-3 flex gap-3 flex-wrap text-xs">
        <a
          href={recipe.href}
          className="text-green-700 font-semibold hover:text-green-500 transition-colors"
        >
          Make 'em
        </a>
        <a
          href={recipe.categoryHref}
          className="text-green-700 font-semibold hover:text-green-500 transition-colors"
        >
          {recipe.category}
        </a>
      </div>
    </div>
  );
};

function Explore({ recipes }: any) {
  return (
    <div className="py-6 bg-gray-50 min-h-screen">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Recipe Cards
        </h1>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe: Recipe, index: number) => (
            <RecipeCard recipe={recipe} key={index} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination currentPage={1} totalPages={311} />
      </div>
    </div>
  );
}

export default async function Page() {
  const recipes = (await getRecipes()) as any;

  if (!recipes) {
    notFound();
  }

  return (
    <>
      {/* Container with responsive margins */}
      <div className="w-full px-4 lg:px-8 xl:px-16 2xl:px-32">
        <div className="max-w-[1400px] mx-auto">
          {/* Explore Section */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            {/* Left Margin Column - only on extra wide screens */}
            <div className="hidden xl:block xl:col-span-1">
              {/* Empty space for margin */}
            </div>

            {/* Main Content */}
            <div className="xl:col-span-10">
              <Explore recipes={recipes} />
            </div>

            {/* Right Margin Column - only on extra wide screens */}
            <div className="hidden xl:block xl:col-span-1">
              {/* Empty space for margin */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
