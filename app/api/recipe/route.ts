export const dynamic = "force-static";
export const revalidate = 60;
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
          id: id,
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
    /*
    const token = await auth.getToken(request);
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

     */
    const recipe = await request.json();
    const createdRecipe = await prisma.recipe.create({
      data: {
        title: recipe.title,
        description: recipe.description,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        category: recipe.category,
        // Required fields from schema
        allergyInfo: recipe.allergyInfo || "",
        author: recipe.author || {},
        categoryLink: recipe.categoryLink || "",
        featuredText: recipe.featuredText || "",
        heroImage: recipe.heroImage || "",
        img: recipe.img || "",
        intro: recipe.intro || "",
        mustKnowTips: recipe.mustKnowTips || [],
        notes: recipe.notes || [],
        nutritionDisclaimer: recipe.nutritionDisclaimer || "",
        professionalSecrets: recipe.professionalSecrets || [],
        serving: recipe.serving || "",
        shortDescription: recipe.shortDescription || "",
        slug: recipe.slug || recipe.title.toLowerCase().replace(/\s+/g, "-"),
        storage: recipe.storage || "",
        story: recipe.story || "",
        testimonial: recipe.testimonial || "",
        tools: recipe.tools || [],
        updatedDate: recipe.updatedDate || new Date().toISOString(),
        images: recipe.images || [],
      },
    });

    // Automatically revalidate affected pages using tags
    try {
      const categorySlug = recipe.category?.toLowerCase().replace(/\s+/g, "-");

      // Call our admin revalidation API with tag-based revalidation
      const revalidateResponse = await fetch(
        `${
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
        }/api/admin/revalidate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            admin_secret:
              process.env.ADMIN_SECRET || process.env.REVALIDATE_SECRET,
            action: "new-recipe",
            recipe_slug: createdRecipe.slug,
            recipe_category: categorySlug,
            tags: [
              "recipes",
              "all-recipes",
              "latest",
              "trending",
              "categories",
              ...(categorySlug ? [`category-${categorySlug}`] : []),
            ],
          }),
        }
      );

      if (revalidateResponse.ok) {
        console.log("✅ Auto-revalidation successful");
      } else {
        console.warn(
          "⚠️ Auto-revalidation failed:",
          await revalidateResponse.text()
        );
      }
    } catch (revalidateError) {
      console.warn("❌ Failed to auto-revalidate:", revalidateError);
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
  var id = url.searchParams.get("id");

  let recipe;
  try {
    recipe = await request.json(); // Parse body once
  } catch (e) {
    return NextResponse.json(
      { error: "Invalid JSON in request body" },
      { status: 400 }
    );
  }

  // Check for id in query params first, then fall back to body
  if (!id) {
    id = recipe.id;
  }

  if (!id) {
    return NextResponse.json(
      { error: "Recipe ID is required" },
      { status: 400 }
    );
  }

  try {
    /*
    const token = await auth.getToken(request);
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
*/
    const updatedRecipe = await prisma.recipe.update({
      where: {
        id: id,
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
    });

    // Automatically revalidate affected pages using tags
    try {
      const categorySlug = recipe.category?.toLowerCase().replace(/\s+/g, "-");

      // Call our admin revalidation API with tag-based revalidation
      const revalidateResponse = await fetch(
        `${
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
        }/api/admin/revalidate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            admin_secret:
              process.env.ADMIN_SECRET || process.env.REVALIDATE_SECRET,
            action: "update-recipe",
            recipe_slug: updatedRecipe.slug,
            recipe_category: categorySlug,
            tags: [
              "recipes",
              "all-recipes",
              `recipe-${updatedRecipe.slug}`,
              "latest",
              "trending",
              "categories",
              ...(categorySlug ? [`category-${categorySlug}`] : []),
            ],
          }),
        }
      );

      if (revalidateResponse.ok) {
        console.log("✅ Auto-revalidation successful for updated recipe");
      } else {
        console.warn(
          "⚠️ Auto-revalidation failed:",
          await revalidateResponse.text()
        );
      }
    } catch (revalidateError) {
      console.warn("❌ Failed to auto-revalidate:", revalidateError);
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
  var id = url.searchParams.get("id");
  // Check for id in query params first, then fall back to checking the request body
  if (!id) {
    try {
      const payload = await request.json();
      id = payload.id;
    } catch (e) {
      // If request has no body or parsing fails, continue with null id
      return NextResponse.json(
        { error: "Recipe ID is required" },
        { status: 400 }
      );
    }
  }

  if (!id) {
    return NextResponse.json(
      { error: "Recipe ID is required" },
      { status: 400 }
    );
  }

  try {
    // Auth is handled by middleware, no need to check again

    const deletedRecipe = await prisma.recipe.delete({
      where: {
        id: id,
      },
    });

    // Automatically revalidate affected pages using tags
    try {
      const categorySlug = deletedRecipe.category
        ?.toLowerCase()
        .replace(/\s+/g, "-");

      // Call our admin revalidation API with tag-based revalidation
      const revalidateResponse = await fetch(
        `${
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
        }/api/admin/revalidate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            admin_secret:
              process.env.ADMIN_SECRET || process.env.REVALIDATE_SECRET,
            action: "delete-recipe",
            recipe_slug: deletedRecipe.slug,
            recipe_category: categorySlug,
            tags: [
              "recipes",
              "all-recipes",
              `recipe-${deletedRecipe.slug}`,
              "latest",
              "trending",
              "categories",
              ...(categorySlug ? [`category-${categorySlug}`] : []),
            ],
          }),
        }
      );

      if (revalidateResponse.ok) {
        console.log("✅ Auto-revalidation successful for deleted recipe");
      } else {
        console.warn(
          "⚠️ Auto-revalidation failed:",
          await revalidateResponse.text()
        );
      }
    } catch (revalidateError) {
      console.warn("❌ Failed to auto-revalidate:", revalidateError);
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
