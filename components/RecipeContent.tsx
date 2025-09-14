import Image from "next/image";
import Recipe from "@/outils/types";
import { TipCard } from "./TipCard";
import EssentialIngredients from "./EssentialIngerdients";
import CompleteCookingProcess from "./CompleteProcess";
import { Card } from "./Card";
import { getHostname } from "@/lib/utils";

interface RecipeContentProps {
  recipe: Recipe;
}

export function RecipeContent({ recipe }: RecipeContentProps) {
  recipe = Array.isArray(recipe) ? recipe[0] : recipe;
  return (
    <div className="space-y-8 mt-2 text-md max-w-none">
      {/* Hero Image */}
      <div className="relative w-full h-96 md:h-[500px] rounded-lg overflow-hidden">
        <Image
          src={`${recipe.images[0]}?w=1200&`}
          alt={recipe.title}
          fill
          className="object-cover"
          priority
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
      {/* Second Image */}
      <div className="relative w-full h-96 rounded-lg overflow-hidden">
        <Image
          src={`${recipe.images[1]}?w=1000&`}
          alt="Honey Sesame Chicken and Broccoli cooking process"
          fill
          className="object-cover"
        />
        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded">
          {recipe.title} | {getHostname()}
        </div>
      </div>
      {/* Complete Cooking Process */}
      <CompleteCookingProcess completeProcess={recipe.completeProcess} />
      {/* Third Image */}
      <div className="relative w-full h-96 rounded-lg overflow-hidden">
        <Image
          src={`${recipe.images[2]}?w=1000&`}
          alt="Honey Sesame Chicken and Broccoli final dish"
          fill
          className="object-cover"
        />
        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded">
          {recipe.title} | {getHostname()}
        </div>
      </div>
      {/* Sections */}
      {recipe.sections?.map((item: any, index: number) => {
        return (
          <div>
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
              <div className="relative w-full h-96 rounded-lg overflow-hidden">
                <Image
                  src={`${recipe.images[1]}?w=1000&`}
                  alt="Honey Sesame Chicken and Broccoli final dish"
                  fill
                  className="object-cover"
                />
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
