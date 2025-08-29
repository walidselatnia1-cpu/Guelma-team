import { RecipeContent } from "@/components/RecipeContent";
import { RelatedRecipes } from "@/components/RelatedRecipes";
import { notFound } from "next/navigation";
import { getRecipe, getRecipes } from "@/data/data";
import Side from "@/components/Side";

export default async function RecipePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const recipe = (await getRecipe(slug)) as any;

  if (!recipe) return notFound();

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8  px-4 py-8 ">
        {/* Main Content */}

        <div className="lg:col-span-1"></div>

        <div className="lg:col-span-3">
          <RecipeContent recipe={recipe} />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-2">
          <div className="sticky top-8">
            <Side recipe={recipe} />
          </div>
        </div>
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
