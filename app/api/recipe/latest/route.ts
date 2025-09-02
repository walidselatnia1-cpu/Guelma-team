export const dynamic = "force-static";
export const revalidate = 60;

import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getRecipeRelations } from "@/lib/prisma-helpers";

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

    const recipes = await prisma.recipe.findMany({
      include: recipeRelations,
      orderBy: { updatedAt: "desc" },
      take: limit,
    });

    console.log("✅ Found", recipes.length, "latest recipes");

    // Add featuredText for latest recipes
    const recipesWithFeature = recipes.map((recipe) => ({
      ...recipe,
      featuredText: "Latest Recipe",
    }));

    return NextResponse.json(recipesWithFeature);
  } catch (error) {
    console.error("Error fetching latest recipes:", error);
    return NextResponse.json(
      { error: "Failed to fetch latest recipes" },
      { status: 500 }
    );
  }
}
