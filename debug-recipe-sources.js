// Debug script to trace where the extra recipe is coming from
const fetch = require("node-fetch");

async function debugRecipeFlow() {
  console.log("🔍 Recipe Debug Analysis");
  console.log("========================");

  try {
    // 1. Check API directly
    console.log("\n1. Direct API Call:");
    const apiResponse = await fetch("http://localhost:3000/api/recipe");
    const apiData = await apiResponse.json();
    console.log(`API returns: ${apiData.length} recipes`);

    if (apiData.length > 0) {
      console.log("Recipe IDs from API:");
      apiData.forEach((recipe, index) => {
        console.log(`  ${index + 1}. ID: ${recipe.id}, Title: ${recipe.title}`);
      });
    }

    // 2. Check latest recipes API
    console.log("\n2. Latest Recipes API:");
    const latestResponse = await fetch(
      "http://localhost:3000/api/recipe/latest?limit=10"
    );
    const latestData = await latestResponse.json();
    console.log(`Latest API returns: ${latestData.length} recipes`);

    if (latestData.length > 0) {
      console.log("Latest Recipe IDs:");
      latestData.forEach((recipe, index) => {
        console.log(`  ${index + 1}. ID: ${recipe.id}, Title: ${recipe.title}`);
      });
    }

    // 3. Check trending recipes API
    console.log("\n3. Trending Recipes API:");
    const trendingResponse = await fetch(
      "http://localhost:3000/api/recipe/trending?limit=10"
    );
    const trendingData = await trendingResponse.json();
    console.log(`Trending API returns: ${trendingData.length} recipes`);

    if (trendingData.length > 0) {
      console.log("Trending Recipe IDs:");
      trendingData.forEach((recipe, index) => {
        console.log(`  ${index + 1}. ID: ${recipe.id}, Title: ${recipe.title}`);
      });
    }
  } catch (error) {
    console.error("Debug error:", error);
  }
}

debugRecipeFlow();
