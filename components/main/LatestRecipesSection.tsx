import React from "react";
import Recipe from "@/outils/types";
import { getLatest } from "@/data/data";
import Image from "next/image";

interface LatestRecipesSectionProps {
  className?: string;
  limit?: number;
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
export default async function LatestRecipesSection({
  className,
  limit = 6,
}: LatestRecipesSectionProps) {
  let latestRecipes: Recipe[] = [];
  let hasError = false;

  try {
    latestRecipes = await getLatest(limit);
  } catch (err) {
    console.error("Failed to fetch trending recipes:", err);
    hasError = true;
    // In production, you might want to show a fallback or empty state
    // For now, we'll show an empty array
    latestRecipes = [];
  }

  // Don't render the section if there are no recipes and there's an error
  if (hasError && latestRecipes.length === 0) {
    return null; // or return a fallback UI
  }

  // Don't render if no recipes available
  if (latestRecipes.length === 0) {
    return null;
  }

  return (
    <section className={`box-border my-[51.2px] ${className || ""}`}>
      <div className="relative box-border max-w-full w-full mx-auto px-4">
        <div className="box-border gap-x-[51.2px] flex flex-col gap-y-[51.2px]">
          <div className="items-center box-border flex justify-between uppercase">
            <h2 className="text-neutral-900 text-[24.96px] font-bold items-center box-border flex basis-[0%] grow leading-[29.952px] md:text-[36.48px] md:leading-[43.776px] after:accent-auto after:bg-zinc-200 after:box-border after:text-neutral-900 after:block after:basis-[0%] after:grow after:text-[24.96px] after:not-italic after:normal-nums after:font-bold after:h-1.5 after:tracking-[normal] after:leading-[29.952px] after:list-outside after:list-disc after:min-w-4 after:outline-dashed after:outline-1 after:text-start after:indent-[0px] after:uppercase after:visible after:w-full after:ml-4 after:rounded-lg after:border-separate after:font-system_ui after:md:text-[36.48px] after:md:leading-[43.776px]">
              Latest Recipes
            </h2>
            <a
              href="/recipes"
              title="All Recipes"
              className="text-white font-bold items-center bg-neutral-900 box-border flex ml-4 my-4 p-2 rounded-[50%]"
            >
              <svg className="w-3 h-3 text-white">
                <use href="/symbols-v4.svg?#arrow-right"></use>
              </svg>
            </a>
          </div>

          <div className="box-border gap-x-[25.6px] grid grid-cols-[1fr] gap-y-[25.6px] xl:grid-cols-[repeat(3,1fr)] lg:grid-cols-[repeat(3,1fr)] md:grid-cols-[repeat(3,1fr)]">
            {latestRecipes.map((recipe) => (
              <div
                key={recipe.id || recipe.slug}
                className=" text-gray-700  hover:text-red-700 items-center box-border gap-x-2 flex flex-col col-start-[span_1] gap-y-2 text-center overflow-hidden group"
              >
                <a
                  href={
                    recipe.slug
                      ? `/recipes/${recipe.slug}`
                      : `/recipe/${recipe.id}`
                  }
                  title={recipe.title}
                  className="text-blue-700 bg-stone-100 box-border block h-[300px] w-full overflow-hidden transform transition-transform duration-300 rounded-[14px] group-hover:scale-105"
                >
                  <Image
                    alt={recipe.title || recipe.imageAlt || "Recipe Image"}
                    src={getOptimizedImageUrl(
                      recipe.img || recipe.heroImage,
                      400,
                      65,
                      "webp"
                    )}
                    quality={65}
                    className="aspect-[auto_1024_/_1024] bg-stone-100 box-border  transition-transform duration-300 h-full max-w-full object-cover w-full group-hover:scale-110"
                  />
                </a>

                <div className="flex flex-col items-center min-h-[4rem] justify-center">
                  <a
                    href={recipe.href}
                    title={recipe.title}
                    className="box-border block"
                  >
                    <strong
                      style={{
                        textShadow:
                          "-1px -1px 0 #f6f5f3, 1px -1px 0 #f6f5f3, -1px 1px 0 #f6f5f3, 1px 1px 0 #f6f5f3",
                      }}
                      className="text-md font-bold box-border block leading-[21.504px] md:leading-[26.88px] text-center"
                    >
                      {recipe.title}
                    </strong>
                  </a>
                </div>

                <p className="text-[13.44px] text-gray-900 box-border leading-[21.504px] md:text-[17.28px] md:leading-[27.648px] px-2 text-center line-clamp-3 flex-1">
                  {recipe.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
