import { RecipeContent } from "@/components/RecipeContent";
import { RecipeHero } from "@/components/RecipeHero";

import { getRecipe } from "@/data/data";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const recipe = (await getRecipe(1)) as any;

  console.log(recipe);
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="flex min-h-screen flex-col">
        <div className="lg:col-span-2">
          <RecipeHero recipe={recipe} />
          <RecipeContent recipe={recipe} />
        </div>
        <main className="flex-1">{children}</main>
      </main>
    </div>
  );
}
