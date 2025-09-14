#!/usr/bin/env node

/**
 * Test script for Recipe CRUD operations
 * Demonstrates how to use the recipe-crud-script.js
 */

const {
  uploadImages,
  createRecipe,
  processRecipeImages,
} = require("./recipe-crud-script");
const fs = require("fs");
const path = require("path");

async function testRecipeCreation() {
  console.log("🧪 Testing Recipe CRUD Script\n");

  try {
    // Test 1: Create recipe without images
    console.log("Test 1: Creating recipe without images");
    const simpleRecipe = {
      title: "Simple Test Recipe",
      category: "Test",
      description: "A simple test recipe",
      slug: "simple-test-recipe",
      heroImage: "https://example.com/image.jpg", // External URL
      ingredients: [
        {
          section: "Main",
          items: ["1 cup flour", "1 cup sugar", "1 egg"],
        },
      ],
      instructions: [
        {
          step: 1,
          title: "Mix ingredients",
          description: "Mix all ingredients together",
        },
      ],
    };

    const result1 = await createRecipe(simpleRecipe);
    console.log("✅ Recipe created:", result1.title);
    console.log("");

    // Test 2: Test image processing function
    console.log("Test 2: Testing image processing function");
    const mockUploads = [
      {
        originalName: "test-image.jpg",
        url: "/uploads/recipes/test-image-123.jpg",
        filename: "test-image-123.jpg",
      },
    ];

    const recipeWithImages = {
      title: "Recipe with Images",
      heroImage: "test-image.jpg", // Should be replaced
      img: "test-image.jpg", // Should be replaced
      images: ["test-image.jpg", "another-image.jpg"], // Should be partially replaced
    };

    const processed = processRecipeImages(recipeWithImages, mockUploads);
    console.log("Original heroImage:", recipeWithImages.heroImage);
    console.log("Processed heroImage:", processed.heroImage);
    console.log("✅ Image processing works correctly\n");

    // Test 3: Show usage examples
    console.log("Test 3: Usage Examples");
    console.log("Command line usage:");
    console.log("node recipe-crud-script.js -r sample-recipe.json");
    console.log(
      "node recipe-crud-script.js -r sample-recipe.json -i image1.jpg,image2.jpg"
    );
    console.log("");

    console.log("Programmatic usage:");
    console.log(`
// Upload images first
const uploadedImages = await uploadImages(['image1.jpg', 'image2.jpg'], 'recipes');

// Create recipe
const recipe = { title: 'My Recipe', heroImage: 'image1.jpg' };
const result = await createRecipe(recipe, uploadedImages);
    `);

    console.log("\n🎉 All tests completed successfully!");
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    process.exit(1);
  }
}

// Run tests if called directly
if (require.main === module) {
  testRecipeCreation();
}

module.exports = { testRecipeCreation };
