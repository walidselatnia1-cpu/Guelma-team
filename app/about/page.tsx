import { RecipeHero } from "@/components/RecipeHero";
import { RecipeContent } from "@/components/RecipeContent";
import { RelatedRecipes } from "@/components/RelatedRecipes";
import { Footer } from "@/components/Footer";
import { notFound } from "next/navigation";
import { getRecipe } from "@/data/data";
import Side from "@/components/Side";
import About from "@/components/main/Aboute";

export default async function RecipePage({}) {
  return (
    <>
      <div className="px-4 py-8 max-w-7xl mx-auto">
        <About />
      </div>
    </>
  );
}
