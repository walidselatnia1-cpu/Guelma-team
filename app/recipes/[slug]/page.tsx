import { RecipeContent } from "@/components/RecipeContent";
import { RelatedRecipes } from "@/components/RelatedRecipes";
import { notFound } from "next/navigation";
import { getRecipe, getRecipes, getRelated } from "@/data/data";
import Side from "@/components/Side";

// Force dynamic rendering to avoid build-time fetch issues
export const dynamic = "force-dynamic";

export default async function RecipePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const recipe = (await getRecipe(slug)) as any;

  if (!recipe) return notFound();

  // Fetch related recipes with error handling
  let relatedRecipes = [];
  try {
    relatedRecipes = await getRelated(recipe.id, 6);
  } catch (error) {
    console.error("❌ Failed to fetch related recipes:", error);
    // Continue with empty array - the Side component will handle it
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-8  px-4 py-8 ">
        {/* Main Content */}
        <div className="lg:col-span-1 "></div>

        <div className="lg:col-span-4">
          <RecipeContent recipe={recipe} />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-2">
          <div className="sticky top-8">
            <Side recipe={recipe} relatedRecipes={relatedRecipes} />
          </div>
        </div>
        <div className="lg:col-span-1 "></div>
      </div>
    </>
  );
}

// Temporarily disabled to avoid build-time fetch issues
// export async function generateStaticParams() {
//   const recipes = await getRecipes();

//   return (
//     recipes?.map((recipe) => ({
//       slug: recipe.slug,
//     })) || []
//   );
// }
