export const dynamic = "force-static";

import { RecipeContent } from "@/components/RecipeContent";
import { RelatedRecipes } from "@/components/RelatedRecipes";
import { notFound } from "next/navigation";
import { getRecipe, getRecipes, getRelated } from "@/data/data";
import Side from "@/components/Side";
import ViewTracker from "@/components/ViewTracker";
import Recipe from "@/outils/types";

export default async function RecipePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const recipe = (await getRecipe(slug)) as any;

  if (!recipe) return notFound();

  // Fetch related recipes with error handling
  let relatedRecipes: Recipe[] = [];
  try {
    relatedRecipes = await getRelated(recipe.id, 6);
  } catch (error) {
    console.error("❌ Failed to fetch related recipes:", error);
    // Continue with empty array - the Side component will handle it
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-16 gap-8 px-4 py-8  mx-auto">
        {/* Main Content */}
        <div className="lg:col-span-2 xl:col-span-3"></div>

        <div className="lg:col-span-6 xl:col-span-8">
          <ViewTracker recipeId={recipe.id} />
          <RecipeContent recipe={recipe} />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-3 xl:col-span-4">
          <div className="sticky top-8">
            <Side recipe={recipe} relatedRecipes={relatedRecipes} />
          </div>
        </div>

        <div className="lg:col-span-1 xl:col-span-1"></div>
      </div>
    </>
  );
}

export async function generateStaticParams() {
  const recipes = await getRecipes();

  return (
    recipes?.map((recipe) => ({
      slug: recipe.slug,
    })) || []
  );
}
