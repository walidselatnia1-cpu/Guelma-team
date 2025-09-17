// Quick test script to check trending functionality
// Run with: node test-trending.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function testTrending() {
  try {
    console.log("🔍 Testing trending functionality...\n");

    // Get all recipes
    const allRecipes = await prisma.recipe.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        views: true,
        lastViewedAt: true,
        createdAt: true,
      },
    });

    console.log("📊 All recipes:");
    allRecipes.forEach((recipe) => {
      console.log(
        `  - ${recipe.title}: ${recipe.views} views, last viewed: ${
          recipe.lastViewedAt || "never"
        }`
      );
    });

    // Test trending query
    const trendingRecipes = await prisma.recipe.findMany({
      where: {
        OR: [
          { views: { gt: 0 } },
          {
            lastViewedAt: {
              not: null,
              gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
            },
          },
        ],
      },
      orderBy: [{ views: "desc" }, { lastViewedAt: "desc" }],
      take: 10,
      select: {
        id: true,
        title: true,
        views: true,
        lastViewedAt: true,
      },
    });

    console.log("\n📈 Trending query results:");
    if (trendingRecipes.length === 0) {
      console.log("  No recipes found for trending");
    } else {
      trendingRecipes.forEach((recipe) => {
        console.log(`  - ${recipe.title}: ${recipe.views} views`);
      });
    }

    // Test view increment
    if (allRecipes.length > 0) {
      const testRecipe = allRecipes[0];
      console.log(`\n🔧 Testing view increment on: ${testRecipe.title}`);

      const updatedRecipe = await prisma.recipe.update({
        where: { id: testRecipe.id },
        data: {
          views: { increment: 1 },
          lastViewedAt: new Date(),
        },
        select: {
          id: true,
          title: true,
          views: true,
          lastViewedAt: true,
        },
      });

      console.log(
        `✅ Updated: ${updatedRecipe.views} views, last viewed: ${updatedRecipe.lastViewedAt}`
      );
    }
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testTrending();
