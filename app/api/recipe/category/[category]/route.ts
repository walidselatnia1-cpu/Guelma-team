import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getRecipeRelations } from "@/lib/prisma-helpers";

export async function GET(
  request: NextRequest,
  { params }: { params: { category: string } }
) {
  try {
    const category = params.category;
    const url = new URL(request.nextUrl);
    const limit = url.searchParams.get("limit");

    console.log("🔍 Fetching recipes for category:", category);

    const recipeRelations = getRecipeRelations();

    const recipes = await prisma.recipe.findMany({
      where: {
        category: {
          equals: category,
          mode: "insensitive", // Case insensitive search
        },
      },
      include: recipeRelations,
      orderBy: { createdAt: "desc" },
      ...(limit && { take: parseInt(limit) }),
    });

    console.log("✅ Found", recipes.length, "recipes for category:", category);
    return NextResponse.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes by category:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipes by category" },
      { status: 500 }
    );
  }
}
