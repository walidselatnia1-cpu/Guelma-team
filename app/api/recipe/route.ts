export const dynamic = "force-dynamic"; // Changed from force-static to force-dynamic
export const revalidate = 0; // Disable caching temporarily
// Updated main recipe route with better error handling
// app/api/recipe/route.ts (Enhanced version)
import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

/**
 * GET /api/recipe
 * Gets a single recipe by id, or all recipes if id is not provided
 * @param {NextRequest} request
 * @returns {NextResponse} a JSON response containing the recipe(s)
 */
/**
 * POST /api/recipe
 * Creates a new recipe
 * @param {NextRequest} request
 * @returns {NextResponse} a JSON response containing the created recipe
 */

export async function GET(request: NextRequest) {
  const url = new URL(request.nextUrl);
  const id = url.searchParams.get("id");

  try {
    if (id) {
      const recipe = await prisma.recipe.findUnique({
        where: {
          id: parseInt(id),
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      if (!recipe) {
        return NextResponse.json(
          { error: "Recipe not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(recipe);
    }

    const recipes = await prisma.recipe.findMany({
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
    console.error("Error fetching recipes:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipes" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = await auth.getToken(request);
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const recipe = await request.json();
    const createdRecipe = await prisma.recipe.create({
      data: {
        title: recipe.title,
        description: recipe.description,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        category: recipe.category,
        // Add other fields as needed based on your Recipe interface
        author: {
          connect: {
            id: token.sub,
          },
        },
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Revalidate all related pages to show new recipe immediately
    try {
      await fetch(
        `${
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
        }/api/revalidate?path=/&secret=${process.env.REVALIDATE_SECRET}`
      );
      await fetch(
        `${
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
        }/api/revalidate?path=/recipes&secret=${process.env.REVALIDATE_SECRET}`
      );
      await fetch(
        `${
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
        }/api/revalidate?path=/categories&secret=${
          process.env.REVALIDATE_SECRET
        }`
      );
    } catch (revalidateError) {
      console.warn("Failed to revalidate pages:", revalidateError);
    }

    return NextResponse.json(createdRecipe);
  } catch (error) {
    console.error("Error creating recipe:", error);
    return NextResponse.json(
      { error: "Failed to create recipe" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const url = new URL(request.nextUrl);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Recipe ID is required" },
      { status: 400 }
    );
  }

  try {
    const token = await auth.getToken(request);
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const recipe = await request.json();
    const updatedRecipe = await prisma.recipe.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: recipe.title,
        description: recipe.description,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        category: recipe.category,
        // Add other fields as needed
        updatedAt: new Date(),
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Revalidate all related pages to show updated recipe immediately
    try {
      await fetch(
        `${
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
        }/api/revalidate?path=/&secret=${process.env.REVALIDATE_SECRET}`
      );
      await fetch(
        `${
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
        }/api/revalidate?path=/recipes&secret=${process.env.REVALIDATE_SECRET}`
      );
      await fetch(
        `${
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
        }/api/revalidate?path=/categories&secret=${
          process.env.REVALIDATE_SECRET
        }`
      );
    } catch (revalidateError) {
      console.warn("Failed to revalidate pages:", revalidateError);
    }

    return NextResponse.json(updatedRecipe);
  } catch (error) {
    console.error("Error updating recipe:", error);
    return NextResponse.json(
      { error: "Failed to update recipe" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const url = new URL(request.nextUrl);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Recipe ID is required" },
      { status: 400 }
    );
  }

  try {
    const token = await auth.getToken(request);
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const deletedRecipe = await prisma.recipe.delete({
      where: {
        id: parseInt(id),
      },
    });

    // Revalidate all related pages to clear ISR cache
    try {
      await fetch(
        `${
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
        }/api/revalidate?path=/&secret=${process.env.REVALIDATE_SECRET}`
      );
      await fetch(
        `${
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
        }/api/revalidate?path=/recipes&secret=${process.env.REVALIDATE_SECRET}`
      );
      await fetch(
        `${
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
        }/api/revalidate?path=/categories&secret=${
          process.env.REVALIDATE_SECRET
        }`
      );
    } catch (revalidateError) {
      console.warn("Failed to revalidate pages:", revalidateError);
    }

    return NextResponse.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return NextResponse.json(
      { error: "Failed to delete recipe" },
      { status: 500 }
    );
  }
}
