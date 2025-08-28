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
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8  px-4 py-8 ">
        {/* Main Content */}
        <div className="lg:col-span-1"></div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-8">
            <About />{" "}
          </div>
        </div>
      </div>
    </>
  );
}
