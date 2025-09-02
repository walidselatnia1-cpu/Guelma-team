/**
 * Test script for Recipe Image Linking
 * This demonstrates how to properly link images when creating recipes
 */

// Example: How to create a recipe with linked images

const testRecipeWithImages = {
  // Basic recipe info
  title: "Honey Sesame Chicken & Broccoli",
  intro:
    "A sweet and savory dish that's perfect for weeknight dinners. This recipe combines tender chicken with crisp broccoli in a delicious honey sesame sauce.",
  description:
    "This honey sesame chicken and broccoli recipe is a family favorite that brings restaurant-quality flavors to your home kitchen.",
  category: "dinner",

  // 🔗 IMAGE LINKING - This is the key part!

  // 1. Main image (required) - Primary photo for cards/listings
  img: "/uploads/recipes/honey-chicken-main.jpg",

  // 2. Hero image (optional) - Large banner for recipe page
  heroImage: "/uploads/recipes/honey-chicken-hero.jpg",

  // 3. Additional images array - Step photos, ingredients, etc.
  images: [
    "/uploads/recipes/honey-chicken-main.jpg", // Always include main
    "/uploads/recipes/honey-chicken-hero.jpg", // Include hero if different
    "/uploads/recipes/honey-chicken-step1.jpg", // Cooking step 1
    "/uploads/recipes/honey-chicken-step2.jpg", // Cooking step 2
    "/uploads/recipes/honey-chicken-ingredients.jpg", // Ingredients layout
  ],

  // Recipe content with image references
  ingredients: [
    {
      section: "Chicken",
      items: [
        "2 lbs chicken breast, cut into chunks",
        "1 tbsp cornstarch",
        "1 tsp salt",
      ],
    },
    {
      section: "Sauce",
      items: ["1/4 cup honey", "2 tbsp soy sauce", "1 tbsp sesame oil"],
    },
  ],

  instructions: [
    {
      step: "1",
      instruction:
        "Cut chicken into bite-sized pieces and season with salt. You can reference the ingredients photo at /uploads/recipes/honey-chicken-ingredients.jpg",
    },
    {
      step: "2",
      instruction:
        "Heat oil in a large skillet over medium-high heat. See step photo: /uploads/recipes/honey-chicken-step1.jpg",
    },
    {
      step: "3",
      instruction:
        "Add chicken and cook until golden brown. Reference: /uploads/recipes/honey-chicken-step2.jpg",
    },
  ],

  // Recipe metadata
  timing: {
    prepTime: "15 minutes",
    cookTime: "20 minutes",
    totalTime: "35 minutes",
  },

  recipeInfo: {
    difficulty: "Easy",
    cuisine: "Asian-American",
    servings: "4",
    dietary: "Gluten-free option",
  },

  author: {
    name: "Chef Sarah",
    link: "/chefs/sarah",
    avatar: "/uploads/authors/chef-sarah.jpg",
    bio: "Asian cuisine specialist with 10 years experience",
  },
};

// Function to create recipe via API
async function createRecipeWithImages(recipeData: typeof testRecipeWithImages) {
  try {
    const response = await fetch("/api/recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add auth headers as needed
      },
      body: JSON.stringify(recipeData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`API Error: ${error.error}`);
    }

    const createdRecipe = await response.json();

    console.log("✅ Recipe created successfully!");
    console.log("📷 Images linked:");
    console.log("   Main:", createdRecipe.img);
    console.log("   Hero:", createdRecipe.heroImage);
    console.log("   All Images:", createdRecipe.images);

    return createdRecipe;
  } catch (error) {
    console.error("❌ Failed to create recipe:", error);
    throw error;
  }
}

// Example workflow: Upload files first, then create recipe
async function uploadThenCreateWorkflow() {
  try {
    // Step 1: Upload images
    console.log("📤 Uploading images...");

    const uploadImage = async (file: File, category: string = "recipes") => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", category);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        return result.url;
      } else {
        throw new Error(result.error);
      }
    };

    // Assume you have file objects from form inputs
    // const mainFile = document.getElementById('main-image').files[0];
    // const heroFile = document.getElementById('hero-image').files[0];
    // const step1File = document.getElementById('step1-image').files[0];

    // Upload all images (pseudo-code)
    // const mainImageUrl = await uploadImage(mainFile);
    // const heroImageUrl = await uploadImage(heroFile);
    // const step1ImageUrl = await uploadImage(step1File);

    // Step 2: Create recipe with uploaded image URLs
    const recipeWithUploadedImages = {
      ...testRecipeWithImages,
      // img: mainImageUrl,
      // heroImage: heroImageUrl,
      // images: [mainImageUrl, heroImageUrl, step1ImageUrl]
    };

    // const result = await createRecipeWithImages(recipeWithUploadedImages);
    console.log("✅ Complete workflow finished!");
  } catch (error) {
    console.error("❌ Workflow failed:", error);
  }
}

// Image validation helper
function validateRecipeImages(recipeData: any) {
  const errors: string[] = [];

  // Check required main image
  if (!recipeData.img || recipeData.img.trim() === "") {
    errors.push("Main image (img) is required");
  }

  // Validate image URLs
  const imageFields = ["img", "heroImage"];
  imageFields.forEach((field) => {
    const url = recipeData[field];
    if (url && !url.startsWith("/uploads/") && !url.startsWith("http")) {
      errors.push(`${field} should be a valid URL or upload path`);
    }
  });

  // Validate images array
  if (recipeData.images && Array.isArray(recipeData.images)) {
    if (!recipeData.images.includes(recipeData.img)) {
      console.warn(
        "⚠️ Main image not included in images array - this will be auto-corrected"
      );
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Usage example
export {
  testRecipeWithImages,
  createRecipeWithImages,
  uploadThenCreateWorkflow,
  validateRecipeImages,
};

// For browser console testing:
// window.testRecipe = testRecipeWithImages;
// window.createRecipe = createRecipeWithImages;
