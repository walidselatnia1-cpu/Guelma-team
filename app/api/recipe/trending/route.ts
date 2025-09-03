export const dynamic = "force-static";
export const revalidate = 60;

import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getRecipeRelations } from "@/lib/prisma-helpers";
import { unstable_cache } from "next/cache";

/**
 * GET /api/recipe/trending
 * Gets trending recipes based on recent activity
 * @param {NextRequest} request
 * @returns {NextResponse} JSON response with trending recipes
 */
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.nextUrl);
    const limit = parseInt(url.searchParams.get("limit") || "10");

    console.log("🔍 Fetching trending recipes, limit:", limit);

    const recipeRelations = getRecipeRelations();

    // Use cache with tags for trending recipes
    const getCachedTrendingRecipes = unstable_cache(
      async () => {
        // For trending, use recently created recipes
        const trendingRecipes = await prisma.recipe.findMany({
          take: limit,
          orderBy: { createdAt: "desc" },
          include: recipeRelations,
        });

        // Add featuredText for trending recipes
        return trendingRecipes.map((recipe) => ({
          ...recipe,
          featuredText: "Trending Now",
        }));
      },
      [`trending-recipes-${limit}`],
      {
        tags: ["recipes", "trending-recipes", "all-recipes"],
        revalidate: 60,
      }
    );

    const recipesWithFeature = await getCachedTrendingRecipes();

    console.log("✅ Found", recipesWithFeature.length, "trending recipes");

    return NextResponse.json(recipesWithFeature);
  } catch (error) {
    console.error("Error fetching trending recipes:", error);
    return NextResponse.json(
      { error: "Failed to fetch trending recipes" },
      { status: 500 }
    );
  }
}
