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
  const [thirdImageLoaded, setThirdImageLoaded] = useState(false);

  return (
    <div className="space-y-8 mt-2 text-md max-w-none">
      {/* Hero Image - Above the fold, load immediately */}
      <div className="relative w-full h-96 md:h-[500px] rounded-lg overflow-hidden">
        <Image
          src={`${recipe.images[0]}?w=1200`}
          alt={recipe.title}
          fill
          className="object-cover"
          priority // Highest priority for LCP
        />
        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded">
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
      {/* Second Image - Scroll-based loading */}
      <div
        ref={secondImageRef}
        className="relative w-full h-96 rounded-lg overflow-hidden"
      >
        {secondImageVisible && (
          <Image
            src={`${recipe.images[1]}?w=1000`}
            alt="Honey Sesame Chicken and Broccoli cooking process"
            fill
            className="object-cover"
            loading="lazy"
          />
        )}
        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded">
          {recipe.title} | {getHostname()}
        </div>
      </div>
      {/* Complete Cooking Process */}
      <CompleteCookingProcess completeProcess={recipe.completeProcess} />
      {/* Third Image - Progressive loading with blur placeholder */}
      <div
        ref={thirdImageRef}
        className="relative w-full h-96 rounded-lg overflow-hidden"
      >
        {thirdImageVisible && (
          <>
            {/* Low-quality blur placeholder */}
            <Image
              src={`${recipe.images[2]}?w=100&q=20`}
              alt=""
              fill
              className={`object-cover transition-opacity duration-500 ${
                thirdImageLoaded ? "opacity-0" : "opacity-100"
              }`}
              style={{ filter: "blur(10px)" }}
            />
            {/* High-quality image */}
            <Image
              src={`${recipe.images[2]}?w=1000`}
              alt="Honey Sesame Chicken and Broccoli final dish"
              fill
              className={`object-cover transition-opacity duration-500 ${
                thirdImageLoaded ? "opacity-100" : "opacity-0"
              }`}
              loading="lazy"
              onLoad={() => setThirdImageLoaded(true)}
            />
          </>
        )}
        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded">
          {recipe.title} | {getHostname()}
        </div>
      </div>
      {/* Sections */}
      {recipe.sections?.map((item: any, index: number) => {
        // Create individual scroll loading hook for each section image
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
            {item.img != undefined ? (
              <div
                ref={sectionImageRef}
                className="relative w-full h-96 rounded-lg overflow-hidden"
              >
                {sectionImageVisible && (
                  <Image
                    src={`${recipe.images[1]}?w=1000`}
                    alt="Honey Sesame Chicken and Broccoli final dish"
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                )}
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded">
                  {recipe.title} | {getHostname()}
                </div>
              </div>
            ) : null}
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
