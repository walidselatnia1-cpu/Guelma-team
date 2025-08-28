import { notFound } from "next/navigation";
import { getRecipe } from "@/data/data";
import Contact from "@/components/main/Contact";

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
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8  px-4 py-8 ">
        {/* Main Content */}

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8"></div>
        </div>

        <div className="lg:col-span-4">
          <Contact />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8"></div>
        </div>
      </div>
    </>
  );
}
