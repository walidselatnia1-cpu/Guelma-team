import { RecipeHero } from "@/components/RecipeHero";
import { RecipeContent } from "@/components/RecipeContent";
import { RelatedRecipes } from "@/components/RelatedRecipes";
import { Footer } from "@/components/Footer";
import { notFound } from "next/navigation";
import { getRecipe } from "@/data/data";
import Side from "@/components/Side";

export default async function RecipePage({
  params,
}: {
  params: { id: string };
}) {
  const { id }: any = params; // ✅ await params in App Router

  const recipe = (await getRecipe(id)) as any;
  console.log(recipe);

  //[TODO: make ids of json relevent] SEO, also make route for you want to see [only image and title]

  if (!recipe) {
    notFound();
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8  px-4 py-8 ">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <RecipeContent recipe={recipe} />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <Side recipe={recipe} />
          </div>
        </div>
      </div>
      <RelatedRecipes recipes={recipe.relatedRecipes} />
    </>
  );
}
