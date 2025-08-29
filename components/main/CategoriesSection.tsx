import React from "react";
import { Recipe } from "@prisma/client";
import { getCategories } from "@/data/data";
import { Category } from "@/outils/types";
import { categories } from "@/data/categories";

interface CategoriesSectionProps {
  className?: string;
}

export default async function CategoriesSection({
  className,
}: CategoriesSectionProps) {
  let _categories: Category[] = {};

  let hasError = false;

  try {
    _categories = categories;
    //categories = await getCategories();
  } catch (err) {
    console.error("Failed to fetch trending recipes:", err);
    hasError = true;
    // In production, you might want to show a fallback or empty state
    // For now, we'll show an empty array
    _categories = [];
  }

  // Don't render the section if there are no recipes and there's an error
  if (hasError && _categories.length === 0) {
    return null; // or return a fallback UI
  }

  // Don't render if no recipes available
  if (_categories.length === 0) {
    return null;
  }
  return (
    <section className={`box-border my-[51.2px] ${className || ""}`}>
      <div className="relative box-border max-w-full w-full mx-auto px-4">
        <div className="box-border gap-x-[51.2px] flex flex-col gap-y-[51.2px]">
          <div className="items-center box-border flex justify-between uppercase">
            <h2 className="text-neutral-900 text-[24.96px] font-bold items-center box-border flex basis-[0%] grow leading-[29.952px] md:text-[36.48px] md:leading-[43.776px] after:accent-auto after:bg-zinc-200 after:box-border after:text-neutral-900 after:block after:basis-[0%] after:grow after:text-[24.96px] after:not-italic after:normal-nums after:font-bold after:h-1.5 after:tracking-[normal] after:leading-[29.952px] after:list-outside after:list-disc after:min-w-4 after:outline-dashed after:outline-1 after:text-start after:indent-[0px] after:uppercase after:visible after:w-full after:ml-4 after:rounded-lg after:border-separate after:font-system_ui after:md:text-[36.48px] after:md:leading-[43.776px]">
              Best Categories
            </h2>
            <a
              href="/categories"
              title="All categories"
              className="text-white text-[13.44px] font-bold items-center bg-neutral-900 box-border flex leading-[21.504px] ml-4 my-4 p-2 rounded-[50%] md:text-[17.28px] md:leading-[27.648px]"
            >
              <svg className="w-3 h-3 text-white">
                <use href="/symbols-v4.svg?#arrow-right"></use>
              </svg>
            </a>
          </div>

          <div className="box-border">
            <div className="box-border h-auto w-auto md:h-0 md:w-0">
              <div className="box-border">
                <div className="relative box-border table mx-auto">
                  <div className="items-center gap-x-2.5 flex justify-center min-h-[100px] gap-y-2.5 w-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="box-border gap-x-[25.6px] grid grid-cols-[1fr] gap-y-[25.6px] md:grid-cols-[repeat(3,1fr)]">
            {_categories.map((category) => (
              <div key={category.slug} className="box-border group">
                <a
                  href={category.href}
                  title={category.title}
                  className="relative text-blue-700 box-border hover:scale-105  transform transition-transform duration-300 block h-40 overflow-hidden rounded-xl"
                >
                  <img
                    alt={category.alt}
                    src={category.image}
                    sizes={category.sizes}
                    className={
                      "  transition-transform duration-300 hover:scale-110 "
                    }
                  />
                  <span
                    className="absolute bottom-0 left-4 text-xl font-black text-black"
                    style={{
                      textShadow:
                        "-1px -1px 0 #f6f5f3, 1px -1px 0 #f6f5f3, -1px 1px 0 #f6f5f3, 1px 1px 0 #f6f5f3",
                    }}
                  >
                    {category.title}
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
