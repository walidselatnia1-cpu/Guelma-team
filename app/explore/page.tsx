import React from "react";
import { Recipe } from "@/outils/types";
import { notFound } from "next/navigation";
import { getRecipes } from "@/data/data";
import { RecipeHero } from "@/components/RecipeHero";

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
        <p className="text-gray-600 text-sm leading-snug line-clamp-2">
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2
          className="my-3 text-neutral-900 text-[24.96px] font-bold items-center box-border flex basis-[0%] grow leading-[29.952px] md:text-[36.48px] md:leading-[43.776px] after:accent-auto after:bg-zinc-200 after:box-border after:text-neutral-900 after:block after:basis-[0%] after:grow after:text-[24.96px] after:not-italic after:normal-nums after:font-bold after:h-1.5 after:tracking-[normal] after:leading-[29.952px] after:list-outside after:list-disc after:min-w-4 after:outline-dashed after:outline-1 after:text-start after:indent-[0px] after:uppercase after:visible after:w-full after:ml-4 after:rounded-lg after:border-separate after:font-system_ui after:md:text-[36.48px] after:md:leading-[43.776px]
                          before:bg-zinc-200 before:box-border before:text-neutral-900 before:block before:basis-[0%] before:grow before:text-[24.96px] before:not-italic before:normal-nums before:font-bold before:h-1.5 before:tracking-[normal] before:leading-[29.952px] before:list-outside before:list-disc before:min-w-4 before:outline-dashed before:outline-1 before:text-start before:indent-[0px] before:uppercase before:visible before:w-full before:ml-4 before:rounded-lg before:border-separate before:font-system_ui before:md:text-[36.48px] before:md:leading-[43.776px]
          "
        >
          {" "}
          Recipe Cards
        </h2>

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

export default async function Page({ params }: { params: { id: string } }) {
  const recipes = (await getRecipes()) as any;

  if (!recipes) {
    notFound();
  }

  return (
    <>
      {/* Explore Section */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
        {/* Left Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            {/* Left sidebar content can go here */}
          </div>
        </div>

        {/* Explore Content - Middle */}
        <div className="lg:col-span-4">
          <div className="sticky top-8">
            <Explore recipes={recipes} />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            {/* Right sidebar content can go here */}
          </div>
        </div>
      </div>
    </>
  );
}
