"use client";
import Image from "next/image";
import { useState } from "react";
import Recipe from "@/outils/types";
import { TipCard } from "./TipCard";
import EssentialIngredients from "./EssentialIngerdients";
import CompleteCookingProcess from "./CompleteProcess";
import { Card } from "./Card";
import { getHostname } from "@/lib/utils";
import { useScrollLoading } from "@/lib/hooks/useScrollLoading";

interface RecipeContentProps {
  recipe: Recipe;
}

// Optimized image URL generator for Cloudflare CDN
const getOptimizedImageUrl = (
  src: string,
  width: number,
  quality = 85,
  format = "webp"
) => {
  // Remove existing query parameters
  const cleanSrc = src.split("?")[0];
  return `${cleanSrc}?w=${width}&q=${quality}&f=${format}`;
};

export function RecipeContent({ recipe }: RecipeContentProps) {
  recipe = Array.isArray(recipe) ? recipe[0] : recipe;

  // Scroll-based loading hooks for below-the-fold images
  const { ref: secondImageRef, isVisible: secondImageVisible } =
    useScrollLoading({
      threshold: 0.1,
      rootMargin: "100px",
    });

  const { ref: thirdImageRef, isVisible: thirdImageVisible } = useScrollLoading(
    {
      threshold: 0.1,
      rootMargin: "100px",
    }
  );

  // State for progressive loading
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);

  return (
    <div className="space-y-8 mt-2 text-md max-w-none">
      {/* Hero Image - Optimized for LCP */}
      <div className="relative w-full h-96 md:h-[500px] rounded-lg overflow-hidden">
        {/* Tiny blur placeholder for instant loading */}
        <Image
          src={getOptimizedImageUrl(recipe.images[0], 20, 20)}
          alt=""
          fill
          className={`object-cover transition-opacity duration-300 ${
            heroImageLoaded ? "opacity-0" : "opacity-100"
          }`}
          style={{
            filter: "blur(20px)",
            transform: "scale(1.1)",
          }}
          priority
        />

        {/* High-quality hero image */}
        <Image
          src={getOptimizedImageUrl(recipe.images[0], 1200, 90)}
          alt={recipe.title}
          fill
          className={`object-cover transition-opacity duration-500 ${
            heroImageLoaded ? "opacity-100" : "opacity-0"
          }`}
          priority
          quality={90}
          onLoad={() => setHeroImageLoaded(true)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
        />

        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded backdrop-blur-sm">
          {recipe.title} | {getHostname()}
        </div>
      </div>

      {/* Story */}
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-700 leading-relaxed text-[1.2rem]">
          {recipe.story}
        </p>
      </div>

      {/* Why You'll Love This */}
      <TipCard
        title={recipe.whyYouLove?.title}
        items={recipe.whyYouLove?.items}
      />

      {/* Testimonial */}
      <div className="prose prose-lg max-w-none text-[1.2rem]">
        <p className="text-gray-700 leading-relaxed italic">
          {recipe.testimonial}
        </p>
      </div>

      {/* Essential Ingredient Guide */}
      <EssentialIngredients essIngredientGuide={recipe.essIngredientGuide} />

      {/* Second Image - Lazy loaded with optimized sizes */}
      <div
        ref={secondImageRef}
        className="relative w-full h-96 rounded-lg overflow-hidden bg-gray-100"
      >
        {secondImageVisible && (
          <Image
            src={getOptimizedImageUrl(recipe.images[1], 800, 85)}
            alt={`${recipe.title} - cooking process`}
            fill
            className="object-cover"
            loading="lazy"
            quality={85}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 800px"
          />
        )}
        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded backdrop-blur-sm">
          {recipe.title} | {getHostname()}
        </div>
      </div>

      {/* Complete Cooking Process */}
      <CompleteCookingProcess completeProcess={recipe.completeProcess} />

      {/* Third Image - Lazy loaded */}
      <div
        ref={thirdImageRef}
        className="relative w-full h-96 rounded-lg overflow-hidden bg-gray-100"
      >
        {thirdImageVisible && (
          <Image
            src={getOptimizedImageUrl(recipe.images[2], 800, 85)}
            alt={`${recipe.title} - final dish`}
            fill
            className="object-cover"
            loading="lazy"
            quality={85}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 800px"
          />
        )}
        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded backdrop-blur-sm">
          {recipe.title} | {getHostname()}
        </div>
      </div>

      {/* Sections with optimized images */}
      {recipe.sections?.map((item: any, index: number) => {
        const { ref: sectionImageRef, isVisible: sectionImageVisible } =
          useScrollLoading({
            threshold: 0.1,
            rootMargin: "100px",
          });

        return (
          <div key={index}>
            {item.type === "card" ? (
              <TipCard
                title={item.title}
                items={item.items}
                after={item.after}
              />
            ) : (
              <>
                <h2
                  className="
          relative flex items-center
          before:content-[''] before:rounded-2xl
          before:w-[0.7rem] before:min-w-[0.7rem]
          before:me-[0.7rem] before:bg-[var(--mo-article-any)]
          before:self-stretch
          text-[calc(var(--mo-font-size)*1.3)]
          leading-[1.2]
          font-bold
          text-[1.5rem]
          m-4
          ml-0
        "
                >
                  {item.title}
                </h2>
                <div className="prose prose-lg max-w-none text-[1.2rem]">
                  <p className="text-gray-700 leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </>
            )}

            {item.img !== undefined && (
              <div
                ref={sectionImageRef}
                className="relative w-full h-96 rounded-lg overflow-hidden bg-gray-100"
              >
                {sectionImageVisible && (
                  <Image
                    src={getOptimizedImageUrl(
                      recipe.images[item.img] || recipe.images[1],
                      700,
                      80
                    )}
                    alt={`${recipe.title} - ${item.title}`}
                    fill
                    className="object-contain"
                    loading="lazy"
                    quality={80}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 85vw, 700px"
                  />
                )}
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded backdrop-blur-sm">
                  {recipe.title} | {getHostname()}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* FAQ Section */}
      <div>
        <h2
          className="
          relative flex items-center
          before:content-[''] before:rounded-2xl
          before:w-[0.7rem] before:min-w-[0.7rem]
          before:me-[0.7rem] before:bg-[var(--mo-article-any)]
          before:self-stretch
          text-[calc(var(--mo-font-size)*1.3)]
          leading-[1.2]
          font-bold
          text-[1.5rem]
          m-4
          ml-0
        "
        >
          {recipe.questions?.title}
        </h2>
        <div className="space-y-6 text-[1.2rem]">
          {recipe.questions?.items?.map((item: any, index: any) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <h3 className="flex font-bold items-center space-x-2 font-bold text-gray-900 mb-2">
                <span>{"→" + item.question}</span>
              </h3>
              <p className="text-gray-700 leading-relaxed pl-6">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Card recipe={recipe} />
    </div>
  );
}
