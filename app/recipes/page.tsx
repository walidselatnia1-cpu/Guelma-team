export const dynamic = "force-static";

import React from "react";
import { Recipe } from "@/outils/types";
import { notFound } from "next/navigation";
import { getRecipes } from "@/data/data";
import Link from "next/link";

const Pagination = ({
  currentPage = 1,
  totalPages = 311,
  basePath = "/recipes",
}) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  // Calculate page numbers to show
  const getPageNumbers = () => {
    let pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total pages is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate middle pages
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Add ellipsis after page 1 if needed
      if (startPage > 2) {
        pages.push("...");
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <nav className="flex justify-center mt-8">
      <ul className="flex gap-2 list-none p-0 m-0 text-sm">
        {/* First Arrow */}
        <li className="flex">
          {isFirstPage ? (
            <span className="px-3 py-2 rounded-2xl bg-gray-200 text-gray-600 cursor-not-allowed block">
              «
            </span>
          ) : (
            <Link
              href={`${basePath}?page=1`}
              className="px-3 py-2 rounded-2xl bg-black text-white hover:bg-gray-800 transition-colors block"
            >
              «
            </Link>
          )}
        </li>

        {/* Previous */}
        <li className="flex">
          {isFirstPage ? (
            <span className="px-3 py-2 rounded-2xl bg-gray-200 text-gray-600 cursor-not-allowed block">
              Previous
            </span>
          ) : (
            <Link
              href={`${basePath}?page=${currentPage - 1}`}
              className="px-3 py-2 rounded-2xl bg-black text-white hover:bg-gray-800 transition-colors block"
            >
              Previous
            </Link>
          )}
        </li>

        {/* Page Numbers */}
        {getPageNumbers().map((page, index) => (
          <li key={index} className="flex">
            {page === "..." ? (
              <span className="px-3 py-2 rounded-2xl bg-gray-200 text-gray-600 block">
                ...
              </span>
            ) : page === currentPage ? (
              <span className="px-3 py-2 rounded-2xl bg-gray-200 text-gray-600 cursor-not-allowed block">
                {page}
              </span>
            ) : (
              <Link
                href={`${basePath}?page=${page}`}
                className="px-3 py-2 rounded-2xl bg-black text-white hover:bg-gray-800 transition-colors block"
              >
                {page}
              </Link>
            )}
          </li>
        ))}

        {/* Next */}
        <li className="flex">
          {isLastPage ? (
            <span className="px-3 py-2 rounded-2xl bg-gray-200 text-gray-600 cursor-not-allowed block">
              Next
            </span>
          ) : (
            <Link
              href={`${basePath}?page=${currentPage + 1}`}
              className="px-3 py-2 rounded-2xl bg-black text-white hover:bg-gray-800 transition-colors block"
            >
              Next
            </Link>
          )}
        </li>

        {/* Last Arrow */}
        <li className="flex">
          {isLastPage ? (
            <span className="px-3 py-2 rounded-2xl bg-gray-200 text-gray-600 cursor-not-allowed block">
              »
            </span>
          ) : (
            <Link
              href={`${basePath}?page=${totalPages}`}
              className="px-3 py-2 rounded-2xl bg-black text-white hover:bg-gray-800 transition-colors block"
            >
              »
            </Link>
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
      <a
        href={"/recipes/" + recipe.slug}
        className="block w-full h-40 overflow-hidden"
      >
        <img
          src={recipe.img || recipe.heroImage}
          alt={recipe.imageAlt || recipe.title}
          className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
        />
      </a>

      <div className="flex flex-col flex-1 gap-2 p-3">
        <a href={"/recipes/" + recipe.slug} className="block">
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
          href={"/recipes/" + recipe.slug}
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

function Explore({
  recipes,
  currentPage,
  totalPages,
}: {
  recipes: Recipe[];
  currentPage: number;
  totalPages: number;
}) {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className=" xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Recipe Cards
        </h1>

        {/* Recipe Grid */}
        <div className="grid grid-cols-3 gap-6">
          {recipes.map((recipe: Recipe, index: number) => (
            <RecipeCard recipe={recipe} key={index} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/recipes"
        />
      </div>
    </div>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const pageSize = 9; // Show 9 recipes per page

  const allRecipes = (await getRecipes()) as any[];

  if (!allRecipes) {
    notFound();
  }

  // Calculate total pages
  const totalPages = Math.ceil(allRecipes.length / pageSize);

  // Get current page of recipes
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedRecipes = allRecipes.slice(startIndex, startIndex + pageSize);

  return (
    <div className="page-content">
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
            <Explore
              recipes={paginatedRecipes}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            {/* Right sidebar content can go here */}
          </div>
        </div>
      </div>
    </div>
  );
}
