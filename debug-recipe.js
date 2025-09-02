// Quick test script for recipe retrieval debugging
const { testRecipeRetrieval, getRecipe } = require("./data/data.ts");

console.log("🚀 Starting debug test...");

// Test the function
testRecipeRetrieval()
  .then(() => {
    console.log("🎉 Test completed!");
  })
  .catch((error) => {
    console.error("💥 Test failed:", error);
  });
