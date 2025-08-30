export const dynamic = "force-static";
export const revalidate = 60;

// app/api/recipe/category/[category]/route.ts
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

/**
 * GET /api/recipe/category/[category]
 * Gets all recipes in a specific category
 * @param {NextRequest} request
 * @param {{ params: { category: string } }} context
 * @returns {NextResponse} JSON response with recipes in the category
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { category: string } }
) {
  const url = new URL(request.nextUrl);
  const limit = url.searchParams.get("limit");
  const category = decodeURIComponent(params.category);

  try {
    const recipes = await prisma.recipe.findMany({
      where: {
        category: {
          equals: category,
          mode: "insensitive", // Case-insensitive matching
        },
      },
      ...(limit && { take: parseInt(limit) }),
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(recipes);
  } catch (error) {
    console.error(`Error fetching recipes for category ${category}:`, error);
    return NextResponse.json(
      { error: `Failed to fetch recipes for category: ${category}` },
      { status: 500 }
    );
  }
}
