export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Category } from "@/outils/types";
import { unstable_cache } from "next/cache";

export async function GET() {
  try {
    // Get all recipes with their categories and images
    const recipes = await prisma.recipe.findMany({
      select: {
        category: true,
        categoryLink: true,
        images: true,
      },
    });

    // Group recipes by category and track first image and count
    const categoryMap = new Map<
      string,
      { count: number; link: string; image: string | null }
    >();

    recipes.forEach((recipe) => {
      if (recipe.category) {
        const existing = categoryMap.get(recipe.category);
        categoryMap.set(recipe.category, {
          count: existing ? existing.count + 1 : 1,
          link:
            existing?.link ||
            recipe.categoryLink ||
            `/categories/${recipe.category.toLowerCase().replace(/\s+/g, "-")}`,
          image: existing?.image || recipe.images?.[0] || "/placeholder.jpg",
        });
      }
    });

    // Convert to Category objects
    const categories: Category[] = Array.from(categoryMap.entries()).map(
      ([categoryName, { count, link, image }], index) => ({
        id: (index + 1).toString(),
        slug: categoryName.toLowerCase().replace(/\s+/g, "_"),
        title: categoryName
          .replace(/_/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()),
        href: link,
        alt: `${categoryName.replace(/_/g, " ")} recipes`,
        description: `Discover ${count} delicious ${categoryName.replace(
          /_/g,
          " "
        )} recipes`,
        image: image || "/placeholder.jpg", // Use the first recipe's image or default
        recipeCount: count,
      })
    );

    // Sort by recipe count (most popular first)
    categories.sort((a, b) => (b.recipeCount || 0) - (a.recipeCount || 0));

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
