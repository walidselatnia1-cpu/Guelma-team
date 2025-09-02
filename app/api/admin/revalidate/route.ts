import { NextRequest, NextResponse } from "next/server";
import {
  revalidateAfterNewRecipe,
  revalidateAfterRecipeUpdate,
  revalidateRecipeData,
} from "@/data/data";

/**
 * POST /api/admin/revalidate
 * Manual revalidation endpoint for admin use
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { admin_secret, action, recipe_slug, recipe_category, paths, tags } =
      body;

    // Verify admin secret
    const expectedSecret =
      process.env.ADMIN_SECRET || process.env.REVALIDATE_SECRET;
    if (admin_secret !== expectedSecret) {
      return NextResponse.json(
        { message: "Invalid admin secret" },
        { status: 401 }
      );
    }

    let result = false;

    switch (action) {
      case "new-recipe":
        result = await revalidateAfterNewRecipe(recipe_category);
        break;

      case "update-recipe":
        result = await revalidateAfterRecipeUpdate(
          recipe_slug,
          recipe_category
        );
        break;

      case "custom":
        result = await revalidateRecipeData({ paths, tags });
        break;

      case "all":
        result = await revalidateRecipeData({
          paths: ["/", "/recipes", "/categories", "/explore"],
          tags: ["recipes", "categories", "trending", "latest"],
        });
        break;

      default:
        return NextResponse.json(
          {
            message:
              "Invalid action. Use 'new-recipe', 'update-recipe', 'custom', or 'all'",
          },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: result,
      message: result
        ? "Revalidation triggered successfully"
        : "Revalidation failed",
      action,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ Admin revalidation error:", error);
    return NextResponse.json(
      {
        message: "Revalidation failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/revalidate
 * Returns admin revalidation documentation
 */
export async function GET() {
  return NextResponse.json({
    message: "Admin Revalidation Endpoint",
    usage: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: {
        admin_secret: "your-admin-secret",
        action: "new-recipe | update-recipe | custom | all",
        recipe_slug: "only-for-update-recipe",
        recipe_category: "optional-category",
        paths: "array-for-custom-action",
        tags: "array-for-custom-action",
      },
    },
    examples: {
      revalidateAfterNewRecipe: {
        admin_secret: "your-secret",
        action: "new-recipe",
        recipe_category: "desserts",
      },
      revalidateAfterUpdate: {
        admin_secret: "your-secret",
        action: "update-recipe",
        recipe_slug: "chocolate-cake",
        recipe_category: "desserts",
      },
      revalidateAll: {
        admin_secret: "your-secret",
        action: "all",
      },
      customRevalidation: {
        admin_secret: "your-secret",
        action: "custom",
        paths: ["/", "/recipes"],
        tags: ["recipes"],
      },
    },
  });
}
