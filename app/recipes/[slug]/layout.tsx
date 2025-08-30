import { RecipeHero } from "@/components/RecipeHero";

import { getRecipe } from "@/data/data";

export default async function Layout({
  params,
  children,
}: {
  params: { slug: string };
  children: any;
}) {
  const { slug } = await params;
  const recipe = (await getRecipe(slug)) as any;
  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <div className="bg-stone-100 grid grid-cols-1 lg:grid-cols-6 w-full  w-full  px-4 pt-2 ">
          {/* Main Content */}
          {/*          <div className="lg:col-span-1 "></div>
           */}
          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky">
              <RecipeHero recipe={recipe} />
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-8"></div>
          </div>
        </div>

        {children}
      </main>
    </div>
  );
}
