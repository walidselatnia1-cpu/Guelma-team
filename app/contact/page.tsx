import { notFound } from "next/navigation";
import { getRecipe } from "@/data/data";
import Contact from "@/components/main/Contact";

export default async function RecipePage({}: {}) {
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
