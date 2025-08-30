import { RecipeHero } from "@/components/RecipeHero";
import { RecipeContent } from "@/components/RecipeContent";
import { RelatedRecipes } from "@/components/RelatedRecipes";
import { Footer } from "@/components/Footer";
import { notFound } from "next/navigation";
import { getRecipe } from "@/data/data";
import Side from "@/components/Side";
import Privacy from "@/components/main/Privacy";

export default async function PrivacyPage({}) {
  return (
    <>
      <div className="pl-2 pr-4 py-8 max-w-7xl mx-auto">
        <Privacy />
      </div>
    </>
  );
}
