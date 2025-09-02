import { Article, Recipe, Category } from "@/outils/types";
import latestArticles from "./articles";

// ============================================================================
// CONFIGURATION
// ============================================================================

// Use environment variable for mock mode

const isServer = typeof window === "undefined";
const isClient = !isServer;

// Runtime environment checks
const IS_DEVELOPMENT = process.env.NODE_ENV === "development";
const IS_PRODUCTION = process.env.NODE_ENV === "production";
const IS_TEST = process.env.NODE_ENV === "test";

const MOCK_MODE =
  process.env.NEXT_PUBLIC_MOCK_MODE === "true" ||
  (process.env.NODE_ENV === "development" &&
    process.env.NEXT_PUBLIC_FORCE_REAL_DB !== "true");

console.log(
  "🔧 MOCK_MODE is:",
  MOCK_MODE,
  "| ENV:",
  process.env.NODE_ENV,
  "| FORCE_REAL_DB:",
  process.env.NEXT_PUBLIC_FORCE_REAL_DB
);

// Base URL for API calls
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// ============================================================================
// MOCK DATA UTILITIES
// ============================================================================

// In-memory storage for mock mode
let mockRecipes: Recipe[] = [];
let isInitialized = false;

/**
 * Initialize mock recipes from dummy data
 */
async function initializeMockRecipes() {
  if (!isInitialized) {
    mockRecipes = await getDummyData(10);
    isInitialized = true;
  }
}

/**
 * Generates dummy recipe data for testing
 */
export async function getDummyData(length: number): Promise<Recipe[]> {
  console.log("🏗️ Generating dummy data with length:", length);

  const data = (await import("../data/recipe.json")).default as any;

  // Start with the base recipe using its original slug
  const dummyData: Recipe[] = [data as Recipe];
  console.log("📄 Base recipe loaded:", data?.title, "slug:", data?.slug);

  // Add mock variations
  for (let i = 0; i < length; i++) {
    dummyData.push({
      ...data,
      id: (i + 1).toString(),
      slug: `${data.slug}-mock-${i}`,
      title: `${data.title} Mock ${i}`,
      shortDescription: `${data.shortDescription} - Mock Recipe ${i}`,
      href: `/recipes/${data.slug}-mock-${i}`,
    } as Recipe);
  }

  return dummyData;
}

/**
 * Generates dummy article data for testing
 */
export async function getDummyDataArticles(): Promise<Article[]> {
  return latestArticles;
}

// ============================================================================
// RECIPE FUNCTIONS
// ============================================================================

/**
 * Gets all recipes
 */
export async function getRecipes(): Promise<Recipe[]> {
  return await getData();
}

/**
 * Gets all recipes - either from API or direct DB call during build
 */
export async function getData(): Promise<Recipe[]> {
  if (MOCK_MODE) {
    return getDummyData(10);
  }

  // During build time or server-side, use direct Prisma call
  if (typeof window === "undefined") {
    try {
      const prisma = (await import("@/lib/prisma")).default;
      const recipes = await prisma.recipe.findMany({
        orderBy: { createdAt: "desc" },
      });
      return recipes as unknown as Recipe[];
    } catch (error) {
      console.error("Direct DB call failed:", error);
      return getDummyData(10);
    }
  }

  // Client-side, use API fetch
  const response = await fetch(`${BASE_URL}/api/recipe`);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return (await response.json()) as Recipe[];
}

/**
 * Gets a single recipe by slug
 */
export async function getRecipe(slug: string): Promise<Recipe | null> {
  console.log("🔍 getRecipe called with slug:", slug);

  if (MOCK_MODE) {
    const recipes = await getDummyData(10);

    // Try both exact match and case-insensitive match
    let foundRecipe = recipes.find((recipe: Recipe) => recipe.slug === slug);
    if (!foundRecipe) {
      foundRecipe = recipes.find(
        (recipe: Recipe) => recipe.slug.toLowerCase() === slug.toLowerCase()
      );
    }
    return foundRecipe || null;
  }

  const response = await fetch(
    `${BASE_URL}/api/recipe?slug=${encodeURIComponent(slug)}`
  );
  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error("Failed to fetch recipe");
  }

  return (await response.json()) as Recipe;
}

/**
 * Gets trending recipes
 */
export async function getTrending(limit: number = 10): Promise<Recipe[]> {
  if (MOCK_MODE) {
    const recipes = await getDummyData(20);
    return recipes
      .sort(() => Math.random() - 0.5)
      .slice(0, limit)
      .map((recipe: Recipe) => ({
        ...recipe,
        featuredText: "Trending Now",
      }));
  }

  const response = await fetch(
    `${BASE_URL}/api/recipe/trending?limit=${limit}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch trending recipes");
  }

  return (await response.json()) as Recipe[];
}

/**
 * Gets related recipes for a specific recipe
 */
export async function getRelated(
  recipeId: string,
  limit: number = 6
): Promise<Recipe[]> {
  console.log("🔍 getRelated called with recipeId:", recipeId, "limit:", limit);

  if (MOCK_MODE) {
    const recipes = await getDummyData(15);
    return recipes
      .filter((recipe: Recipe) => recipe.id !== recipeId)
      .slice(0, limit)
      .map((recipe: Recipe) => ({
        ...recipe,
        featuredText: "Related Recipe",
      }));
  }

  try {
    const baseUrl = isServer ? "" : BASE_URL;
    const url = `${baseUrl}/api/recipe/related?id=${encodeURIComponent(
      recipeId
    )}&limit=${limit}`;

    const response = await fetch(url);
    if (!response.ok) {
      console.error(
        "❌ API response not ok:",
        response.status,
        response.statusText
      );
      return [];
    }

    const recipes = await response.json();
    return recipes.map((recipe: any) => ({
      ...recipe,
      featuredText: "Related Recipe",
    }));
  } catch (error) {
    console.error("❌ API call failed for related recipes:", error);
    return [];
  }
}

/**
 * Gets latest recipes
 */
export async function getLatest(limit: number = 12): Promise<Recipe[]> {
  if (MOCK_MODE) {
    const recipes = await getDummyData(20);
    return recipes
      .sort((a: Recipe, b: Recipe) => {
        const aDate = a.updatedDate ? new Date(a.updatedDate).getTime() : 0;
        const bDate = b.updatedDate ? new Date(b.updatedDate).getTime() : 0;
        return bDate - aDate;
      })
      .slice(0, limit)
      .map((recipe: Recipe) => ({
        ...recipe,
        featuredText: "Latest Recipe",
      }));
  }

  const response = await fetch(`${BASE_URL}/api/recipe/latest?limit=${limit}`);
  if (!response.ok) {
    throw new Error("Failed to fetch latest recipes");
  }

  return (await response.json()) as Recipe[];
}

/**
 * Gets recipes by category
 */
export async function getRecipesByCategory(
  category: string,
  limit?: number
): Promise<Recipe[]> {
  if (MOCK_MODE) {
    const recipes = await getDummyData(20);
    const filteredRecipes = recipes.filter(
      (recipe: Recipe) =>
        recipe?.category?.toLowerCase() === category.toLowerCase()
    );

    return limit ? filteredRecipes.slice(0, limit) : filteredRecipes;
  }

  // During build time or server-side, use direct Prisma call
  if (typeof window === "undefined") {
    try {
      const prisma = (await import("@/lib/prisma")).default;
      const recipes = await prisma.recipe.findMany({
        where: {
          category: {
            equals: category,
            mode: "insensitive",
          },
        },
        ...(limit && { take: limit }),
        orderBy: { createdAt: "desc" },
      });

      return recipes as unknown as Recipe[];
    } catch (error) {
      console.error("Direct DB call failed for category:", error);
      return [];
    }
  }

  // Client-side, use API fetch
  const url = `${BASE_URL}/api/recipe/category/${encodeURIComponent(category)}${
    limit ? `?limit=${limit}` : ""
  }`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch recipes for category: ${category}`);
  }

  return (await response.json()) as Recipe[];
}

// ============================================================================
// CATEGORY FUNCTIONS
// ============================================================================

/**
 * Helper function to create category object from category name and recipes
 */
async function createCategoryFromName(
  categoryName: string,
  allRecipes?: Recipe[]
): Promise<Category> {
  const slug = categoryName;
  let categoryImage = `/images/categories/default.jpg`;

  if (allRecipes) {
    const firstRecipeInCategory = allRecipes.find(
      (recipe: Recipe) => recipe.category === categoryName
    );

    if (
      firstRecipeInCategory &&
      firstRecipeInCategory.images &&
      firstRecipeInCategory.images.length > 0
    ) {
      categoryImage = firstRecipeInCategory.images[0];
    }
  }

  return {
    id: slug,
    slug: slug,
    title: categoryName,
    href: `/category/${slug}`,
    description: `Discover delicious ${categoryName.toLowerCase()} recipes`,
    image: categoryImage,
    alt: `${categoryName} recipes`,
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  };
}

/**
 * Gets all categories
 */
export async function getCategories(): Promise<Category[]> {
  if (MOCK_MODE) {
    const recipes = await getDummyData(10);
    const uniqueCategoryNames = [
      ...new Set(
        recipes
          .map((recipe: Recipe) => recipe.category)
          .filter((category): category is string => Boolean(category))
      ),
    ];

    return Promise.all(
      uniqueCategoryNames.map((categoryName: string) =>
        createCategoryFromName(categoryName, recipes)
      )
    );
  }

  try {
    console.log("🌐 Fetching dynamic categories from API");
    const response = await fetch(`${BASE_URL}/api/categories`);

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error fetching categories:", error);

    try {
      const prisma = (await import("@/lib/prisma")).default;
      const recipes = await prisma.recipe.findMany({
        select: {
          category: true,
          categoryLink: true,
          images: true,
        },
      });

      const categoryMap = new Map<
        string,
        { count: number; link: string; recipes: { images: string[] }[] }
      >();

      recipes.forEach((recipe) => {
        if (recipe.category) {
          const existing = categoryMap.get(recipe.category);
          if (existing) {
            existing.count += 1;
            existing.recipes.push(recipe);
          } else {
            categoryMap.set(recipe.category, {
              count: 1,
              link:
                recipe.categoryLink ||
                `/categories/${recipe.category
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`,
              recipes: [recipe],
            });
          }
        }
      });

      const categories = Array.from(categoryMap.entries()).map(
        ([categoryName, { count, link, recipes }], index) => {
          let categoryImage = "/placeholder.jpg";
          for (const recipe of recipes) {
            if (recipe.images && recipe.images.length > 0) {
              categoryImage = recipe.images[0];
              break;
            }
          }

          return {
            id: (index + 1).toString(),
            slug: categoryName.toLowerCase().replace(/\s+/g, "_"),
            title: categoryName
              .replace(/_/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase()),
            href: link,
            alt: `${categoryName.replace(/_/g, " ")} recipes`,
            description: `Discover ${count} delicious ${categoryName.replace(
              /_/g,
              " "
            )} recipes`,
            image: categoryImage,
            recipeCount: count,
          };
        }
      );

      categories.sort((a, b) => (b.recipeCount || 0) - (a.recipeCount || 0));
      return categories;
    } catch (dbError) {
      console.error("❌ Direct database call also failed:", dbError);
      return [
        {
          id: "1",
          slug: "family_dinner",
          title: "Family Dinner",
          href: "/categories/family_dinner",
          alt: "Family Dinner Recipes",
          description: "Wholesome Meals for the Whole Family",
          image: "/placeholder.jpg",
        },
      ];
    }
  }
}

/**
 * Gets best categories (popular categories with counts)
 */
export async function getBestCategories(
  limit: number = 5
): Promise<{ category: string; count: number }[]> {
  if (MOCK_MODE) {
    const recipes = await getDummyData(50);
    const categoryCounts = recipes.reduce((acc, recipe: Recipe) => {
      if (!recipe.category) return acc;
      acc[recipe.category] = (acc[recipe.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryCounts)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }

  try {
    const prisma = (await import("@/lib/prisma")).default;
    const recipes = await prisma.recipe.findMany({
      select: { category: true },
    });

    const categoryCounts = recipes.reduce((acc, recipe) => {
      if (!recipe.category) return acc;
      acc[recipe.category] = (acc[recipe.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryCounts)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  } catch (error) {
    console.error("❌ Direct DB call failed for best categories:", error);
    throw new Error("Failed to fetch best categories");
  }
}

// ============================================================================
// ARTICLE FUNCTIONS
// ============================================================================

/**
 * Gets latest articles
 */
export async function getLatestArticles(
  limit: number = 12
): Promise<Article[]> {
  if (MOCK_MODE) {
    const articles = await getDummyDataArticles();
    return articles
      .sort((a: Article, b: Article) => {
        const aDate = new Date(a.updatedDate).getTime();
        const bDate = new Date(b.updatedDate).getTime();
        return bDate - aDate;
      })
      .slice(0, limit);
  }

  try {
    const articles = await getDummyDataArticles();
    return articles
      .sort((a: Article, b: Article) => {
        const aDate = new Date(a.updatedDate).getTime();
        const bDate = new Date(b.updatedDate).getTime();
        return bDate - aDate;
      })
      .slice(0, limit);
  } catch (error) {
    console.error("❌ Failed to get articles:", error);
    throw new Error("Failed to fetch latest articles");
  }
}

// ============================================================================
// ADMIN CRUD FUNCTIONS
// ============================================================================

/**
 * Admin function: Get all recipes for management
 */
export async function adminGetAllRecipes(): Promise<Recipe[]> {
  if (MOCK_MODE) {
    await initializeMockRecipes();
    return mockRecipes;
  }

  const baseUrl = isServer ? "" : BASE_URL;
  const response = await fetch(`${baseUrl}/api/recipe`);
  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }

  return (await response.json()) as Recipe[];
}

/**
 * Admin function: Get recipe by ID
 */
export async function adminGetRecipeById(id: string): Promise<Recipe | null> {
  if (MOCK_MODE) {
    await initializeMockRecipes();
    return mockRecipes.find((recipe) => recipe.id === id) || null;
  }

  const baseUrl = isServer ? "" : BASE_URL;
  const response = await fetch(`${baseUrl}/api/recipe?id=${id}`);
  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error("Failed to fetch recipe");
  }

  return (await response.json()) as Recipe;
}

/**
 * Admin function: Create new recipe
 */
export async function adminCreateRecipe(
  recipeData: Omit<Recipe, "id">
): Promise<Recipe> {
  const newRecipe: Recipe = {
    ...recipeData,
    id: (Date.now() + Math.random()).toString(),
  };

  if (MOCK_MODE) {
    await initializeMockRecipes();
    mockRecipes.unshift(newRecipe);
    return newRecipe;
  }

  const baseUrl = isServer ? "" : BASE_URL;
  const response = await fetch(`${baseUrl}/api/recipe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRecipe),
  });

  if (!response.ok) {
    throw new Error("Failed to create recipe");
  }

  return (await response.json()) as Recipe;
}

/**
 * Admin function: Update existing recipe
 */
export async function adminUpdateRecipe(
  id: string,
  recipeData: Partial<Recipe>
): Promise<Recipe> {
  if (MOCK_MODE) {
    await initializeMockRecipes();
    const index = mockRecipes.findIndex((recipe) => recipe.id === id);
    if (index === -1) {
      throw new Error("Recipe not found");
    }

    const updatedRecipe = {
      ...mockRecipes[index],
      ...recipeData,
      id,
    };

    mockRecipes[index] = updatedRecipe;
    return updatedRecipe;
  }

  const baseUrl = isServer ? "" : BASE_URL;
  const url = `${baseUrl}/api/recipe?id=${encodeURIComponent(id)}`;
  const data = { ...recipeData, id: id };

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update recipe");
  }

  return (await response.json()) as Recipe;
}

/**
 * Admin function: Delete recipe
 */
export async function adminDeleteRecipe(id: string): Promise<void> {
  if (MOCK_MODE) {
    await initializeMockRecipes();
    const index = mockRecipes.findIndex((recipe) => recipe.id === id);
    if (index === -1) {
      throw new Error("Recipe not found");
    }

    mockRecipes.splice(index, 1);
    return;
  }

  const baseUrl = isServer ? "" : BASE_URL;
  const response = await fetch(`${baseUrl}/api/recipe?id=${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete recipe");
  }
}
