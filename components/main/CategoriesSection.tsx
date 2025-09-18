import React from "react";
import { getCategories } from "@/data/data";
import { Category } from "@/outils/types";
import Image from "next/image";

interface CategoriesSectionProps {
  className?: string;
}

const getOptimizedImageUrl = (
  src: string,
  width: number,
  quality = 65,
  format = "webp"
) => {
  // Remove existing query parameters
  const cleanSrc = src.split("?")[0];
  return `${cleanSrc}?w=${width}&q=${quality}&f=${format}`;
};

export default async function CategoriesSection({
  className,
}: CategoriesSectionProps) {
  let _categories: Category[] = [];

  let hasError = false;

  try {
    _categories = await getCategories();
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
    <section className={`box-border ${className || ""}`}>
      <div className="relative box-border max-w-full w-full mx-auto px-4">
        <div className="box-border gap-x-2 flex flex-col gap-y-2">
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

          <div className="box-border gap-x-[25.6px] grid grid-cols-[1fr] gap-y-[25.6px] md:grid-cols-[repeat(3,1fr)]">
            {_categories.map((category) => (
              <div key={category.slug} className="box-border group">
                <a
                  href={category.href}
                  title={category.title}
                  className="relative text-blue-700 box-border hover:scale-105 transform transition-transform duration-300 block h-40 overflow-hidden rounded-xl category-card"
                >
                  <Image
                    alt={category.alt}
                    src={getOptimizedImageUrl(category.image, 400, 65, "webp")}
                    sizes={category.sizes}
                    quality={65}
                    className="transition-transform duration-300 group-hover:scale-110 object-cover w-full h-full z-0"
                  />

                  <div className="absolute inset-0 flex items-center justify-center px-4">
                    <span
                      className="text-2xl md:text-3xl font-serif font-bold text-white text-opacity-80 text-center bg-black bg-opacity-60 px-4 py-2 rounded-lg backdrop-blur-sm"
                      style={{
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
                      }}
                    >
                      {category.title}
                    </span>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
