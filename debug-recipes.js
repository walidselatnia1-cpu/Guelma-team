// Test script to debug recipe discrepancy
const { PrismaClient } = require("@prisma/client");

async function debugRecipes() {
  const prisma = new PrismaClient();

  try {
    console.log("🔍 Checking database recipes...");

    // Get all recipes from database
    const dbRecipes = await prisma.recipe.findMany({
      orderBy: { createdAt: "desc" },
    });

    console.log(`📊 Database has ${dbRecipes.length} recipe(s):`);
    dbRecipes.forEach((recipe, index) => {
      console.log(`  ${index + 1}. ${recipe.title} (slug: ${recipe.slug})`);
    });

    // Check the environment
    console.log("\n🔧 Environment check:");
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
    console.log(`MOCK: ${process.env.MOCK}`);
    console.log(
      `DATABASE_URL: ${process.env.DATABASE_URL ? "Set" : "Not set"}`
    );

    // Test the getData function
    console.log("\n🧪 Testing getData function...");
    const { getData } = require("./data/data.ts");
    const appRecipes = await getData();

    console.log(`📱 App getData returns ${appRecipes.length} recipe(s):`);
    appRecipes.forEach((recipe, index) => {
      console.log(`  ${index + 1}. ${recipe.title} (slug: ${recipe.slug})`);
    });
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

debugRecipes();
