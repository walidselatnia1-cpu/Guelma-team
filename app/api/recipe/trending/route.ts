export const dynamic = "force-dynamic";
export const revalidate = 60;
// app/api/recipe/category/[category]/route.ts
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

/**
 * GET /api/recipe/trending
 * Gets trending recipes based on views, likes, or recent activity
 * @param {NextRequest} request
 * @returns {NextResponse} JSON response with trending recipes
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.nextUrl);
  const limit = parseInt(url.searchParams.get("limit") || "10");

  try {
    // You can modify this query based on your trending logic
    // This example assumes you have fields like views, likes, or createdAt
    const trendingRecipes = await prisma.recipe.findMany({
      take: limit,
      orderBy: [
        // Modify these fields based on your schema
        // { views: 'desc' },
        // { likes: 'desc' },
        { createdAt: "desc" },
      ],
    });

    return NextResponse.json(trendingRecipes);
  } catch (error) {
    console.error("Error fetching trending recipes:", error);
    return NextResponse.json(
      { error: "Failed to fetch trending recipes" },
      { status: 500 }
    );
  }
}
