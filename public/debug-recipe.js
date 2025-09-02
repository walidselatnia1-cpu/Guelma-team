/**
 * Simple recipe debugging utility
 * Run this in your browser console at localhost:3001
 */

// Add this to window for browser console access
if (typeof window !== "undefined") {
  window.debugRecipe = async function (slug = "honey-sesame-chicken-broccoli") {
    console.log("🧪 Debug: Testing recipe retrieval for slug:", slug);

    try {
      // Import the function (this works in Next.js client-side)
      const { getRecipe, getData } = await import("@/data/data");

      console.log("📋 Step 1: Getting all recipes...");
      const allRecipes = await getData();
      console.log("✅ Total recipes found:", allRecipes.length);

      if (allRecipes.length > 0) {
        console.log("📄 First recipe:", allRecipes[0].title);
        console.log(
          "🏷️ All slugs:",
          allRecipes.map((r) => r.slug)
        );

        console.log("🔍 Step 2: Searching for slug:", slug);
        const found = allRecipes.find((recipe) => recipe.slug === slug);
        console.log(
          "✅ Direct find result:",
          found ? found.title : "NOT FOUND"
        );

        console.log("🔍 Step 3: Using getRecipe function...");
        const viaFunction = await getRecipe(slug);
        console.log(
          "✅ getRecipe result:",
          viaFunction ? viaFunction.title : "NOT FOUND"
        );

        return {
          totalRecipes: allRecipes.length,
          availableSlugs: allRecipes.map((r) => r.slug),
          searchedSlug: slug,
          directFind: found ? found.title : null,
          viaFunction: viaFunction ? viaFunction.title : null,
        };
      } else {
        console.log("❌ No recipes found - this is the problem!");
        return { error: "No recipes generated" };
      }
    } catch (error) {
      console.error("💥 Error in debug:", error);
      return { error: error.message };
    }
  };

  // Auto-run on page load
  window.debugRecipe().then((result) => {
    console.log("🎯 Final debug result:", result);
  });
}
