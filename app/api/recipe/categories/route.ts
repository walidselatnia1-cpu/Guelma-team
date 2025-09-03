// app/api/recipe/categories/route.ts
export const dynamic = "force-static";
export const revalidate = 300; // Cache categories longer since they change less frequently

import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

/**
 * GET /api/recipe/categories
 * Gets all unique recipe categories
 * @param {NextRequest} request
 * @returns {NextResponse} JSON response with categories array
 */
export async function GET(request: NextRequest) {
  try {
    // Use cache with tags for categories
    const getCachedCategories = unstable_cache(
      async () => {
        const categories = await prisma.recipe.findMany({
          select: {
            category: true,
          },
          distinct: ["category"],
        });

        const categoryNames = categories
          .map((recipe) => recipe.category)
          .filter(Boolean)
          .sort();

        return categoryNames;
      },
      ["recipe-categories"],
      {
        tags: ["categories", "recipes"],
        revalidate: 300,
      }
    );

    const categoryNames = await getCachedCategories();

    return NextResponse.json(categoryNames);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
