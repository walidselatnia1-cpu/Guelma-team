"use client";
import Image from "next/image";
import { useState } from "react";
import Recipe from "@/outils/types";
import { TipCard } from "./TipCard";
import EssentialIngredients from "./EssentialIngerdients";
import CompleteCookingProcess from "./CompleteProcess";
import { Card } from "./Card";
import { getHostname, renderSafeHtml, hasHtmlTags } from "@/lib/utils";
import { useScrollLoading } from "@/lib/hooks/useScrollLoading";

interface RecipeContentProps {
  recipe: Recipe;
}

// Optimized image URL generator for Cloudflare CDN
const getOptimizedImageUrl = (
  src: string,
  width: number,
  quality = 65,
  format = "webp"
) => {
  // Remove existing query parameters
  const cleanSrc = src?.split("?")[0] || "";
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
      <div className="relative w-full rounded-lg overflow-hidden">
        {!heroImageLoaded && (
          <Image
            src={getOptimizedImageUrl(recipe.images[0], 20, 20)}
            alt=""
            width={1200}
            height={800}
            style={{
              width: "100%",
              height: "auto",
              filter: "blur(20px)",
              transform: "scale(1.1)",
              display: heroImageLoaded ? "none" : "block",
            }}
            className="transition-opacity duration-300"
            priority
          />
        )}

        <Image
          src={getOptimizedImageUrl(recipe.images[0], 1200, 65)}
          alt={recipe.title}
          width={1200}
          height={800}
          style={{
            width: "100%",
            height: "auto",
          }}
          className={`transition-opacity duration-500 ${
            heroImageLoaded ? "opacity-100" : "opacity-0"
          }`}
          priority
          quality={65}
          onLoad={() => setHeroImageLoaded(true)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 65vw, 1200px"
        />

        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded backdrop-blur-sm">
          {recipe.title} | {getHostname()}
        </div>
      </div>

      {/* Story */}
      <div className="prose prose-lg max-w-none">
        {hasHtmlTags(recipe.story) ? (
          <div
            className="text-black leading-relaxed text-[1.2rem]"
            dangerouslySetInnerHTML={renderSafeHtml(recipe.story)}
          />
        ) : (
          <p className="text-black leading-relaxed text-[1.2rem]">
            {recipe.story}
          </p>
        )}
      </div>

      {/* Why You'll Love This */}
      <TipCard
        title={recipe.whyYouLove?.title}
        items={recipe.whyYouLove?.items}
      />

      {/* Testimonial */}
      <div className="prose prose-lg max-w-none text-[1.2rem]">
        {hasHtmlTags(recipe.testimonial) ? (
          <div
            className="text-black leading-relaxed italic"
            dangerouslySetInnerHTML={renderSafeHtml(recipe.testimonial)}
          />
        ) : (
          <p className="text-black leading-relaxed italic">
            {recipe.testimonial}
          </p>
        )}
      </div>

      {/* Essential Ingredient Guide */}
      <EssentialIngredients essIngredientGuide={recipe.essIngredientGuide} />

      {/* Second Image - Lazy loaded with optimized sizes */}
      <div
        ref={secondImageRef}
        className="relative w-full rounded-lg overflow-hidden bg-gray-100"
      >
        {secondImageVisible && (
          <Image
            src={getOptimizedImageUrl(recipe.images[1], 800, 65)}
            alt={`${recipe.title} - cooking process`}
            width={800}
            height={600}
            style={{
              width: "100%",
              height: "auto",
            }}
            loading="lazy"
            quality={65}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 65vw, 800px"
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
        className="relative w-full rounded-lg overflow-hidden bg-gray-100"
      >
        {thirdImageVisible && (
          <Image
            src={getOptimizedImageUrl(recipe.images[2], 800, 65)}
            alt={`${recipe.title} - final dish`}
            width={800}
            height={600}
            style={{
              width: "100%",
              height: "auto",
            }}
            loading="lazy"
            quality={65}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 65vw, 800px"
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
                  {hasHtmlTags(item.content) ? (
                    <div
                      className="text-black leading-relaxed"
                      dangerouslySetInnerHTML={renderSafeHtml(item.content)}
                    />
                  ) : (
                    <p className="text-black leading-relaxed">{item.content}</p>
                  )}
                </div>
              </>
            )}

            {item.img !== undefined && (
              <div
                ref={sectionImageRef}
                className="relative w-full rounded-lg overflow-hidden bg-gray-100"
              >
                {sectionImageVisible && (
                  <Image
                    src={getOptimizedImageUrl(
                      recipe.images[item.img] || recipe.images[1],
                      700,
                      65
                    )}
                    alt={`${recipe.title} - ${item.title}`}
                    width={700}
                    height={500}
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                    loading="lazy"
                    quality={65}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 65vw, 700px"
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
              <h3 className="flex font-bold items-center space-x-2 font-bold text-gray-650 mb-2">
                <span>{"→" + item.question}</span>
              </h3>
              {hasHtmlTags(item.answer) ? (
                <div
                  className="text-black leading-relaxed pl-6"
                  dangerouslySetInnerHTML={renderSafeHtml(item.answer)}
                />
              ) : (
                <p className="text-black leading-relaxed pl-6">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <Card recipe={recipe} />
    </div>
  );
}
