export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Category } from "@/outils/types";

export async function GET() {
  try {
    // Get all recipes with their categories and images
    const recipes = await prisma.recipe.findMany({
      select: {
        category: true,
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
          link: `/categories/${recipe.category
            .toLowerCase()
            .replace(/\s+/g, "-")}`,
          image: existing?.image || recipe.images?.[0] || "/placeholder.jpg",
        });
      }
    });

    // Convert to Category objects
    const categories: Category[] = Array.from(categoryMap.entries()).map(
      ([categoryName, { count, link, image }], index) => {
        // Normalize category name for consistent slug generation
        const normalizedName = categoryName
          .replace(/_/g, " ")
          .replace(/-/g, " ")
          .toLowerCase()
          .trim();

        const slug = normalizedName.replace(/\s+/g, "-");

        return {
          id: (index + 1).toString(),
          slug,
          title: normalizedName
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
          href: link,
          alt: `${normalizedName} recipes`,
          description: `Discover ${count} delicious ${normalizedName} recipes`,
          image: image || "/placeholder.jpg", // Use the first recipe's image or default
          sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
          recipeCount: count,
        };
      }
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
