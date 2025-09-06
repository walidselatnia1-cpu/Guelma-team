// HeroWrapper.tsx
"use client";
import { usePathname } from "next/navigation";
import RecipeHero from "../RecipeHero";

export default function HeroWrapper({ children }: any) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const isSlug = segments[segments.length - 2] === "recipes";
  const isSlugPage = pathname?.includes("/recipes/");
  if (isSlug && isSlugPage) {
    return <>{children}</>;
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <div className="bg-stone-100 grid grid-cols-1 lg:grid-cols-6 w-full gap-8 w-full  px-4 py-8">
          {/* Main Content */}
          <div className="lg:col-span-1 "></div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-8">
              <RecipeHero />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8"></div>
          </div>
        </div>

        {children}
      </main>
    </div>
  );
}
