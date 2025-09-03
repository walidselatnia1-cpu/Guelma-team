export const dynamic = "force-static";
export const revalidate = 60;

import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getRecipeRelations } from "@/lib/prisma-helpers";
import { unstable_cache } from "next/cache";

/**
 * GET /api/recipe/latest
 * Gets the latest recipes
 * @param {NextRequest} request
 * @returns {NextResponse} JSON response with latest recipes
 */
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.nextUrl);
    const limit = parseInt(url.searchParams.get("limit") || "6");

    console.log("🔍 Fetching latest recipes, limit:", limit);

    const recipeRelations = getRecipeRelations();

    // Use cache with tags for latest recipes
    const getCachedLatestRecipes = unstable_cache(
      async () => {
        const recipes = await prisma.recipe.findMany({
          include: recipeRelations,
          orderBy: { updatedAt: "desc" },
          take: limit,
        });

        // Add featuredText for latest recipes
        return recipes.map((recipe) => ({
          ...recipe,
          featuredText: "Latest Recipe",
        }));
      },
      [`latest-recipes-${limit}`],
      {
        tags: ["recipes", "latest-recipes", "all-recipes"],
        revalidate: 60,
      }
    );

    const recipesWithFeature = await getCachedLatestRecipes();

    console.log("✅ Found", recipesWithFeature.length, "latest recipes");

    return NextResponse.json(recipesWithFeature);
  } catch (error) {
    console.error("Error fetching latest recipes:", error);
    return NextResponse.json(
      { error: "Failed to fetch latest recipes" },
      { status: 500 }
    );
  }
}
