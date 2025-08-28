// app/api/recipe/route.ts
import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

/**
 * GET /api/recipe
 * Gets a single recipe by id, or all recipes if id is not provided
 * @param {NextRequest} request
 * @returns {NextResponse} a JSON response containing the recipe(s)
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.nextUrl);
  const id = url.searchParams.get("id");
  if (id) {
    const recipe = await prisma.recipe.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (recipe) {
      return NextResponse.json(recipe);
    }
  }
  const recipes = await prisma.recipe.findMany();
  return NextResponse.json(recipes);
}

export async function POST(request: NextRequest) {
  const token = await auth.getToken(request);
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const recipe = (await request.json()) as Recipe;
  const createdRecipe = await prisma.recipe.create({
    data: {
      title: recipe.title,
      description: recipe.description,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      author: {
        connect: {
          id: token.sub,
        },
      },
    },
  });
  return NextResponse.json(createdRecipe);
}

export async function PUT(request: NextRequest) {
  const url = new URL(request.nextUrl);
  const id = url.searchParams.get("id");
  if (id) {
    const token = await auth.getToken(request);
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const recipe = (await request.json()) as Recipe;
    const updatedRecipe = await prisma.recipe.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: recipe.title,
        description: recipe.description,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        author: {
          connect: {
            id: token.sub,
          },
        },
      },
    });
    if (updatedRecipe) {
      return NextResponse.json(updatedRecipe);
    }
  }
}

export async function DELETE(request: NextRequest) {
  const url = new URL(request.nextUrl);
  const id = url.searchParams.get("id");
  if (id) {
    const token = await auth.getToken(request);
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const deletedRecipe = await prisma.recipe.delete({
      where: {
        id: parseInt(id),
      },
    });
    if (deletedRecipe) {
      return NextResponse.json({ message: "Recipe deleted" });
    }
  }
}
