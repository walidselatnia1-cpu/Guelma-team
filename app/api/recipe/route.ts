export const dynamic = "force-static";
export const revalidate = 60;
// Updated main recipe route with better error handling
// app/api/recipe/route.ts (Enhanced version)
import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getRecipeRelations } from "@/lib/prisma-helpers";

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
  const slug = url.searchParams.get("slug");

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

    if (slug) {
      console.log("🔍 API: Looking for recipe with slug:", slug);
      const recipe = await prisma.recipe.findFirst({
        where: {
          slug: slug,
        },
      });

      if (!recipe) {
        console.log("❌ API: Recipe not found for slug:", slug);
        return NextResponse.json(
          { error: "Recipe not found" },
          { status: 404 }
        );
      }

      console.log("✅ API: Found recipe:", recipe.title);
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
    // Skip auth in development mode
    if (process.env.NODE_ENV !== "production") {
      console.log("🔓 Skipping auth in development mode");
    } else {
      const token = await auth.getToken(request);
      if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
    }

    const recipe = await request.json();

    // Debug: Log the received recipe data
    console.log("🍳 Recipe API: Received recipe data");
    console.log("- Title:", recipe.title);
    console.log("- Main Image (img):", recipe.img);
    console.log("- Hero Image:", recipe.heroImage);
    console.log("- Additional Images:", recipe.images);
    console.log(
      "- Base64 Images:",
      recipe.base64Images ? "Present" : "Not present"
    );

    // Handle image uploads if present
    let mainImageUrl = recipe.img || "";
    let heroImageUrl = recipe.heroImage || "";
    let additionalImageUrls: string[] = recipe.images || [];

    // Process images - handle both file paths and base64 images
    // If img starts with '/uploads/', it's already an uploaded file path
    if (
      recipe.img &&
      !recipe.img.startsWith("/uploads/") &&
      recipe.img.startsWith("data:")
    ) {
      // This is base64, convert it
      mainImageUrl = await uploadBase64Image(recipe.img, "recipes", "main");
    } else if (recipe.img && recipe.img.startsWith("/uploads/")) {
      // This is already a valid file path from FileUpload
      mainImageUrl = recipe.img;
    } else if (recipe.img && recipe.img.startsWith("blob:")) {
      // This is a blob URL, filter it out
      console.log("⚠️ Filtering out blob URL for main image:", recipe.img);
      mainImageUrl = "";
    }

    if (
      recipe.heroImage &&
      !recipe.heroImage.startsWith("/uploads/") &&
      recipe.heroImage.startsWith("data:")
    ) {
      heroImageUrl = await uploadBase64Image(
        recipe.heroImage,
        "recipes",
        "hero"
      );
    } else if (recipe.heroImage && recipe.heroImage.startsWith("/uploads/")) {
      heroImageUrl = recipe.heroImage;
    } else if (recipe.heroImage && recipe.heroImage.startsWith("blob:")) {
      // This is a blob URL, filter it out
      console.log(
        "⚠️ Filtering out blob URL for hero image:",
        recipe.heroImage
      );
      heroImageUrl = "";
    }

    // Handle additional images array
    if (recipe.images && Array.isArray(recipe.images)) {
      additionalImageUrls = await Promise.all(
        recipe.images
          .filter((img: string) => {
            // Filter out blob URLs as they're temporary and invalid
            if (img.startsWith("blob:")) {
              console.log("⚠️ Filtering out blob URL:", img);
              return false;
            }
            return true;
          })
          .map(async (img: string, index: number) => {
            if (img.startsWith("/uploads/")) {
              return img; // Already a valid file path
            } else if (img.startsWith("data:")) {
              return await uploadBase64Image(
                img,
                "recipes",
                `additional-${index}`
              );
            }
            return img; // Return as-is for other formats
          })
      );
    }

    // Process base64 images if provided (legacy support)
    if (recipe.base64Images) {
      const { mainImage, heroImage, additionalImages } = recipe.base64Images;

      // Upload main image
      if (mainImage) {
        mainImageUrl = await uploadBase64Image(mainImage, "recipes", "main");
      }

      // Upload hero image
      if (heroImage) {
        heroImageUrl = await uploadBase64Image(heroImage, "recipes", "hero");
      }

      // Upload additional images
      if (additionalImages && additionalImages.length > 0) {
        additionalImageUrls = await Promise.all(
          additionalImages.map((img: string, index: number) =>
            uploadBase64Image(img, "recipes", `additional-${index}`)
          )
        );
      }
    }

    // Debug: Log processed image URLs
    console.log("📸 Processed Images:");
    console.log("- Main Image URL:", mainImageUrl);
    console.log("- Hero Image URL:", heroImageUrl);
    console.log("- Additional Images:", additionalImageUrls);

    // Create recipe with processed image URLs
    const recipeData = {
      title: recipe.title || "Untitled Recipe",
      slug:
        recipe.slug ||
        recipe.title
          ?.toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-") ||
        `recipe-${Date.now()}`,
      intro: recipe.intro || "",
      description: recipe.description || "",
      shortDescription: recipe.shortDescription || recipe.intro || "",
      story: recipe.story || "",
      testimonial: recipe.testimonial || "",

      // Image fields - key improvement for image linking
      img: mainImageUrl,
      heroImage: heroImageUrl,
      images: additionalImageUrls,

      // Category and metadata
      category: recipe.category || "general",
      categoryLink: recipe.categoryLink || "#general",
      featuredText: recipe.featuredText || "",

      // Recipe details
      serving: recipe.serving || "",
      storage: recipe.storage || "",
      allergyInfo: recipe.allergyInfo || "",
      nutritionDisclaimer: recipe.nutritionDisclaimer || "",

      // Arrays
      mustKnowTips: recipe.mustKnowTips || [],
      professionalSecrets: recipe.professionalSecrets || [],
      notes: recipe.notes || [],
      tools: recipe.tools || [],

      // JSON Objects - using proper JSON structure
      author: recipe.author || {
        name: "Anonymous",
        link: "",
        avatar: "",
        bio: "",
      },
      timing: recipe.timing || null,
      recipeInfo: recipe.recipeInfo || null,
      whyYouLove: recipe.whyYouLove || null,
      questions: recipe.questions || null,

      // JSON Arrays
      essIngredientGuide: recipe.essIngredientGuide || null,
      ingredientGuide: recipe.ingredientGuide || null,
      ingredients: recipe.ingredients || null,
      instructions: recipe.instructions || null,
      completeProcess: recipe.completeProcess || null,
      sections: recipe.sections || null,
      faq: recipe.faq || null,
      relatedRecipes: recipe.relatedRecipes || null,

      // Timestamps
      updatedDate: new Date().toISOString(),
    };

    // Use direct Prisma create without relations for now
    const createdRecipe = await prisma.recipe.create({
      data: recipeData,
    });

    return NextResponse.json(createdRecipe);
  } catch (error) {
    console.error("Error creating recipe:", error);
    return NextResponse.json(
      {
        error: "Failed to create recipe",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Helper function to upload base64 images
async function uploadBase64Image(
  base64Data: string,
  category: string,
  prefix: string
): Promise<string> {
  try {
    // Extract file type and data
    const matches = base64Data.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/);
    if (!matches) {
      throw new Error("Invalid base64 image format");
    }

    const fileType = matches[1];
    const imageData = matches[2];
    const timestamp = Date.now();
    const filename = `${prefix}-${timestamp}.${fileType}`;

    // In production, upload to cloud storage (AWS S3, Cloudinary, etc.)
    // For now, return a simulated URL
    const uploadUrl = `/uploads/${category}/${filename}`;

    // TODO: Implement actual file upload to your storage service
    // const uploadResult = await cloudStorage.upload(Buffer.from(imageData, 'base64'), filename);

    return uploadUrl;
  } catch (error) {
    console.error("Error uploading base64 image:", error);
    throw new Error("Failed to upload image");
  }
}

export async function PUT(request: NextRequest) {
  const url = new URL(request.nextUrl);
  const recipe = await request.json();
  let { id } = recipe;
  console.log("PUT request received:");
  console.log("- URL:", request.url);
  console.log("- Query params:", Object.fromEntries(url.searchParams));
  console.log("- ID from query:", id);

  // Get the request body

  // If no ID in query params, get it from the body
  if (recipe.id && !id) {
    id = recipe.id;
    console.log("ID from body:", id);
  }

  if (!id) {
    console.log("❌ No ID found in query parameters or body");
    return NextResponse.json(
      { error: "Recipe ID is required" },
      { status: 400 }
    );
  }

  try {
    // Skip auth in development mode
    if (process.env.NODE_ENV !== "production") {
      console.log("🔓 Skipping auth in development mode");
    } else {
      const token = await auth.getToken(request);
      if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
    }

    // Debug: Log the received recipe data for update
    console.log("🔄 Recipe API PUT: Received recipe update data");
    console.log("- Title:", recipe.title);
    console.log("- Main Image (img):", recipe.img);
    console.log("- Hero Image:", recipe.heroImage);
    console.log("- Additional Images:", recipe.images);

    // Process images to filter out blob URLs
    let processedImg = recipe.img;
    let processedHeroImage = recipe.heroImage;
    let processedImages = recipe.images;

    if (recipe.img && recipe.img.startsWith("blob:")) {
      console.log("⚠️ PUT: Filtering out blob URL for main image:", recipe.img);
      processedImg = undefined; // Don't update this field
    }

    if (recipe.heroImage && recipe.heroImage.startsWith("blob:")) {
      console.log(
        "⚠️ PUT: Filtering out blob URL for hero image:",
        recipe.heroImage
      );
      processedHeroImage = undefined; // Don't update this field
    }

    if (recipe.images && Array.isArray(recipe.images)) {
      processedImages = recipe.images.filter((img: string) => {
        if (img.startsWith("blob:")) {
          console.log(
            "⚠️ PUT: Filtering out blob URL from additional images:",
            img
          );
          return false;
        }
        return true;
      });
    }

    const updatedRecipe = await prisma.recipe.update({
      where: {
        id: id,
      },
      data: {
        ...(recipe.title && { title: recipe.title }),
        ...(recipe.slug && { slug: recipe.slug }),
        ...(recipe.href && { href: recipe.href }),
        ...(processedImg && { img: processedImg }),
        ...(recipe.intro && { intro: recipe.intro }),
        ...(recipe.description && { description: recipe.description }),
        ...(recipe.shortDescription && {
          shortDescription: recipe.shortDescription,
        }),
        ...(recipe.story && { story: recipe.story }),
        ...(recipe.testimonial && { testimonial: recipe.testimonial }),
        ...(recipe.category && { category: recipe.category }),
        ...(recipe.categoryLink && { categoryLink: recipe.categoryLink }),
        ...(recipe.featuredText && { featuredText: recipe.featuredText }),
        ...(recipe.imageAlt && { imageAlt: recipe.imageAlt }),
        ...(recipe.categoryHref && { categoryHref: recipe.categoryHref }),
        ...(recipe.author && { author: recipe.author }),
        ...(recipe.whyYouLove && { whyYouLove: recipe.whyYouLove }),
        ...(recipe.timing && { timing: recipe.timing }),
        ...(recipe.recipeInfo && { recipeInfo: recipe.recipeInfo }),
        ...(recipe.questions && { questions: recipe.questions }),
        ...(recipe.essIngredientGuide && {
          essIngredientGuide: recipe.essIngredientGuide,
        }),
        ...(recipe.ingredientGuide && {
          ingredientGuide: recipe.ingredientGuide,
        }),
        ...(recipe.ingredients && { ingredients: recipe.ingredients }),
        ...(recipe.instructions && { instructions: recipe.instructions }),
        ...(recipe.completeProcess && {
          completeProcess: recipe.completeProcess,
        }),
        ...(recipe.sections && { sections: recipe.sections }),
        ...(recipe.faq && { faq: recipe.faq }),
        ...(recipe.relatedRecipes && { relatedRecipes: recipe.relatedRecipes }),
        ...(recipe.mustKnowTips && { mustKnowTips: recipe.mustKnowTips }),
        ...(recipe.professionalSecrets && {
          professionalSecrets: recipe.professionalSecrets,
        }),
        ...(recipe.serving && { serving: recipe.serving }),
        ...(recipe.storage && { storage: recipe.storage }),
        ...(processedHeroImage && { heroImage: processedHeroImage }),
        ...(processedImages && { images: processedImages }),
        ...(recipe.notes && { notes: recipe.notes }),
        ...(recipe.tools && { tools: recipe.tools }),
        ...(recipe.allergyInfo && { allergyInfo: recipe.allergyInfo }),
        ...(recipe.nutritionDisclaimer && {
          nutritionDisclaimer: recipe.nutritionDisclaimer,
        }),
        updatedAt: new Date(),
      },
    });

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
    // Skip auth in development mode
    if (process.env.NODE_ENV !== "production") {
      console.log("🔓 Skipping auth in development mode");
    } else {
      const token = await auth.getToken(request);
      if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
    }

    const deletedRecipe = await prisma.recipe.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return NextResponse.json(
      { error: "Failed to delete recipe" },
      { status: 500 }
    );
  }
}
