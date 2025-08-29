import HeroWrapper from "@/components/main/HeroWrapper";
import { RecipeContent } from "@/components/RecipeContent";
import { RecipeHero } from "@/components/RecipeHero";
import { RelatedRecipes } from "@/components/RelatedRecipes";
import Side from "@/components/Side";

import { getRecipe } from "@/data/data";
import { notFound, usePathname } from "next/navigation";

export default async function Layout({ children }: { children: any }) {
  return <HeroWrapper>{children}</HeroWrapper>;
}
