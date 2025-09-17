import { Article, Recipe, Category } from "@/outils/types";
import { apiClient } from "@/lib/api-client";
import latestArticles from "./articles";
import { unstable_cache } from "next/cache";

// Ensure Node.js types are available
declare const process: {
  env: {
    NODE_ENV?: string;
    NEXT_PHASE?: string;
    NEXT_PUBLIC_BASE_URL?: string;
    NEXT_PUBLIC_REVALIDATE_SECRET?: string;
    REVALIDATE_SECRET?: string;
  };
};

// ============================================================================
// CONFIGURATION
// ============================================================================

const isServer = typeof window === "undefined";

// Environment configuration
const IS_DEVELOPMENT = process.env.NODE_ENV === "development";
const IS_BUILD_TIME = process.env.NEXT_PHASE === "phase-production-build";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// Log configuration for debugging
if (IS_DEVELOPMENT) {
  console.log("🔧 Data Service Config:", {
    NODE_ENV: process.env.NODE_ENV,
    IS_BUILD_TIME,
    BASE_URL,
    isServer,
  });
}

// ============================================================================
// CACHE & REVALIDATION UTILITIES
// ============================================================================

interface RevalidationOptions {
  type?: "path" | "tag" | "default";
  target?: string;
  paths?: string[];
  tags?: string[];
}

/**
 * Trigger on-demand revalidation after data changes
 */
async function revalidateRecipeData(
  options: RevalidationOptions = {}
): Promise<boolean> {
  try {
    const revalidateSecret =
      process.env.NEXT_PUBLIC_REVALIDATE_SECRET ||
      process.env.REVALIDATE_SECRET;

    if (!revalidateSecret) {
      console.warn(
        "⚠️ REVALIDATE_SECRET not configured, skipping revalidation"
      );
      return false;
    }

    const { type = "default", target, paths, tags } = options;
    const baseBody = { secret: revalidateSecret, type };

    // Handle bulk revalidation
    if (paths || tags) {
      const promises: Promise<Response>[] = [];

      paths?.forEach((path) => {
        promises.push(
          fetch(`${BASE_URL}/api/revalidate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...baseBody, type: "path", path }),
          })
        );
      });

      tags?.forEach((tag) => {
        promises.push(
          fetch(`${BASE_URL}/api/revalidate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...baseBody, type: "tag", tag }),
          })
        );
      });

      await Promise.all(promises);
      console.log("✅ Bulk revalidation completed");
      return true;
    }

    // Handle single revalidation
    const body = {
      ...baseBody,
      ...(type === "path" && target && { path: target }),
      ...(type === "tag" && target && { tag: target }),
    };

    const response = await fetch(`${BASE_URL}/api/revalidate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("✅ Revalidation triggered:", result.message);
      return true;
    } else {
      console.error("❌ Revalidation failed:", await response.text());
      return false;
    }
  } catch (error) {
    console.error("❌ Revalidation error:", error);
    return false;
  }
}

/**
 * Helper to revalidate after adding a new recipe
 */
async function revalidateAfterNewRecipe(category?: string): Promise<boolean> {
  const tags = ["recipes", "all-recipes", "trending", "latest"];
  const paths = ["/", "/recipes", "/explore", "/categories"];

  if (category) {
    tags.push(`category-${category.toLowerCase()}`);
  }

  return await revalidateRecipeData({ tags, paths });
}

/**
 * Helper to revalidate after updating a recipe
 */
async function revalidateAfterRecipeUpdate(
  slug: string,
  category?: string
): Promise<boolean> {
  const tags = ["recipes", "all-recipes"];
  const paths = [`/recipes/${slug}`];

  if (category) {
    tags.push(`category-${category.toLowerCase()}`);
    paths.push(`/categories/${category.toLowerCase().replace(/\s+/g, "-")}`);
  }

  return await revalidateRecipeData({ tags, paths });
}

// ============================================================================
// DATABASE ACCESS UTILITIES
// ============================================================================

/**
 * Get Prisma client for server-side operations
 */
async function getPrisma() {
  try {
    return (await import("@/lib/prisma")).default;
  } catch (error) {
    console.error("❌ Failed to import Prisma:", error);
    throw new Error("Database connection failed");
  }
}

/**
 * Check if we should use direct database access
 */
function shouldUseDirectDB(): boolean {
  return isServer && (IS_DEVELOPMENT || IS_BUILD_TIME);
}

/**
 * Fetch data with fallback between direct DB and API
 */
async function fetchWithFallback<T>(
  directDbFn: () => Promise<T>,
  apiUrl: string,
  cacheOptions?: {
    tags?: string[];
    revalidate?: number;
  }
): Promise<T> {
  // Use direct database during build time and development
  if (shouldUseDirectDB()) {
    try {
      return await directDbFn();
    } catch (error) {
      console.error("❌ Direct DB call failed:", error);
      throw new Error("Database operation failed during build");
    }
  }

  // Use API fetch for client-side and production
  try {
    const fetchOptions: RequestInit = {};

    if (cacheOptions) {
      fetchOptions.next = {
        tags: cacheOptions.tags,
        revalidate: cacheOptions.revalidate,
      };
    }

    const response = await fetch(apiUrl, fetchOptions);

    if (!response.ok) {
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}`
      );
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error("❌ API fetch failed:", error);
    throw new Error("Failed to fetch data from API");
  }
}

// ============================================================================
// RECIPE FUNCTIONS
// ============================================================================

/**
 * Get all recipes with optional pagination
 */
async function getRecipes(page?: number, limit?: number): Promise<Recipe[]> {
  if (page && limit) {
    // Use paginated API
    const response = await fetch(
      `${BASE_URL}/api/recipe?page=${page}&limit=${limit}`,
      {
        next: {
          tags: ["recipes", "all-recipes"],
          revalidate: 3600,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch recipes: ${response.status}`);
    }

    const data = await response.json();
    return data.recipes || [];
  }

  // Fallback to direct DB access for backward compatibility
  return await fetchWithFallback(
    async () => {
      const prisma = await getPrisma();
      const recipes = await prisma.recipe.findMany({
        orderBy: { createdAt: "desc" },
      });
      return recipes as unknown as Recipe[];
    },
    `${BASE_URL}/api/recipe`,
    {
      tags: ["recipes", "all-recipes"],
      revalidate: 3600,
    }
  );
}

/**
 * Get paginated recipes with metadata
 */
async function getRecipesPaginated(
  page: number = 1,
  limit: number = 9
): Promise<{
  recipes: Recipe[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}> {
  const response = await fetch(
    `${BASE_URL}/api/recipe?page=${page}&limit=${limit}`,
    {
      next: {
        tags: [
          "recipes",
          "all-recipes",
          `explore-page-${page}`,
          `recipes-page-${page}`,
        ],
        revalidate: 3600, // Revalidate every hour
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch recipes: ${response.status}`);
  }

  const data = await response.json();
  return {
    recipes: data.recipes || [],
    pagination: data.pagination || {
      page,
      limit,
      total: 0,
      totalPages: 0,
    },
  };
}

/**
 * Get a single recipe by slug
 */
async function getRecipe(slug: string): Promise<Recipe | null> {
  if (IS_DEVELOPMENT) {
    console.log("🔍 getRecipe called with slug:", slug);
  }

  try {
    return await fetchWithFallback(
      async () => {
        const prisma = await getPrisma();
        const recipe = await prisma.recipe.findFirst({
          where: {
            slug: {
              equals: slug,
              mode: "insensitive",
            },
          },
        });
        return recipe as unknown as Recipe | null;
      },
      `${BASE_URL}/api/recipe?slug=${encodeURIComponent(slug)}`,
      {
        tags: ["recipes", `recipe-${slug}`],
        revalidate: 3600,
      }
    );
  } catch (error) {
    // Handle 404 case specifically
    if (error instanceof Error && error.message.includes("404")) {
      return null;
    }
    console.error("❌ Failed to fetch recipe:", error);
    return null;
  }
}

/**
 * Get trending recipes
 */
async function getTrending(limit: number = 10): Promise<Recipe[]> {
  try {
    const recipes = await fetchWithFallback(
      async () => {
        const prisma = await getPrisma();
        // Get recipes with view data for trending calculation
        const recipes = await prisma.recipe.findMany({
          where: {
            views: {
              gt: 0, // Only include recipes that have been viewed
            },
          },
          orderBy: [
            { views: "desc" }, // Primary sort by views
            { lastViewedAt: "desc" }, // Secondary sort by recency
          ],
          take: limit * 2, // Get more to allow for scoring
        });

        const now = new Date();
        // Calculate trending score for each recipe
        const trendingRecipes = recipes
          .map((recipe) => {
            const daysSinceLastView = recipe.lastViewedAt
              ? Math.max(
                  1,
                  Math.floor(
                    (now.getTime() - recipe.lastViewedAt.getTime()) /
                      (1000 * 60 * 60 * 24)
                  )
                )
              : 30; // Default to 30 days if never viewed

            // Time decay formula: score = views / (1 + days_since_last_view)
            const trendingScore = recipe.views / (1 + daysSinceLastView);

            return {
              ...recipe,
              trendingScore,
              featuredText: "Trending Now",
            };
          })
          .sort((a, b) => b.trendingScore - a.trendingScore) // Sort by trending score
          .slice(0, limit); // Take top N

        return trendingRecipes.map((recipe) => ({
          ...recipe,
          createdAt: recipe.createdAt?.toISOString(),
          updatedAt: recipe.updatedAt?.toISOString(),
          lastViewedAt: recipe.lastViewedAt?.toISOString() || null,
        })) as unknown as Recipe[];
      },
      `${BASE_URL}/api/recipe/trending?limit=${limit}`,
      {
        tags: ["recipes", "trending"],
        revalidate: 1800, // 30 minutes for trending
      }
    );

    return recipes;
  } catch (error) {
    console.error("❌ Failed to fetch trending recipes:", error);
    return [];
  }
}

/**
 * Get related recipes for a specific recipe
 */
async function getRelated(
  recipeId: string,
  limit: number = 6
): Promise<Recipe[]> {
  if (IS_DEVELOPMENT) {
    console.log(
      "🔍 getRelated called with recipeId:",
      recipeId,
      "limit:",
      limit
    );
  }

  try {
    const recipes = await fetchWithFallback(
      async () => {
        const prisma = await getPrisma();
        const recipes = await prisma.recipe.findMany({
          where: { id: { not: recipeId } },
          take: limit,
          orderBy: { createdAt: "desc" },
        });
        return recipes.map((recipe: any) => ({
          ...recipe,
          featuredText: "Related Recipe",
        })) as Recipe[];
      },
      `${BASE_URL}/api/recipe/related?id=${encodeURIComponent(
        recipeId
      )}&limit=${limit}`,
      {
        tags: ["recipes", "related", `related-${recipeId}`],
        revalidate: 3600,
      }
    );

    return recipes;
  } catch (error) {
    console.error("❌ Failed to fetch related recipes:", error);
    return [];
  }
}

/**
 * Get latest recipes
 */
async function getLatest(limit: number = 12): Promise<Recipe[]> {
  try {
    const recipes = await fetchWithFallback(
      async () => {
        const prisma = await getPrisma();
        const recipes = await prisma.recipe.findMany({
          take: limit,
          orderBy: { createdAt: "desc" },
        });
        return recipes.map((recipe: any) => ({
          ...recipe,
          featuredText: "Latest Recipe",
        })) as Recipe[];
      },
      `${BASE_URL}/api/recipe/latest?limit=${limit}`,
      {
        tags: ["recipes", "latest"],
        revalidate: 1800, // 30 minutes for latest
      }
    );

    return recipes;
  } catch (error) {
    console.error("❌ Failed to fetch latest recipes:", error);
    return [];
  }
}

/**
 * Get recipes by category
 */
async function getRecipesByCategory(
  category: string,
  limit?: number
): Promise<Recipe[]> {
  try {
    return await fetchWithFallback(
      async () => {
        const prisma = await getPrisma();
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
      },
      `${BASE_URL}/api/recipe/category/${encodeURIComponent(category)}${
        limit ? `?limit=${limit}` : ""
      }`,
      {
        tags: ["recipes", "categories", `category-${category.toLowerCase()}`],
        revalidate: 3600,
      }
    );
  } catch (error) {
    console.error("❌ Failed to fetch recipes by category:", error);
    return [];
  }
}

// ============================================================================
// CATEGORY FUNCTIONS
// ============================================================================

/**
 * Create category object from name and recipes
 */
function createCategoryFromName(
  categoryName: string,
  count: number,
  link: string,
  image?: string
): Category {
  const slug = categoryName.toLowerCase().replace(/\s+/g, "-");

  return {
    id: slug,
    slug,
    title: categoryName
      .replace(/_/g, " ")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase()),
    href: link,
    description: `Discover ${count} delicious ${categoryName
      .replace(/_/g, " ")
      .toLowerCase()} recipes`,
    image: image || "/images/categories/default.jpg",
    alt: `${categoryName.replace(/_/g, " ")} recipes`,
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    recipeCount: count,
  };
}

/**
 * Get all categories
 */
async function getCategories(): Promise<Category[]> {
  try {
    return await fetchWithFallback(
      async () => {
        const prisma = await getPrisma();
        const recipes = await prisma.recipe.findMany({
          select: {
            category: true,
            categoryLink: true,
            images: true,
          },
        });

        const categoryMap = new Map<
          string,
          { count: number; link: string; image?: string }
        >();

        recipes.forEach((recipe) => {
          if (recipe.category) {
            const existing = categoryMap.get(recipe.category);
            if (existing) {
              existing.count += 1;
              // Use first available image
              if (!existing.image && recipe.images?.[0]) {
                existing.image = recipe.images[0];
              }
            } else {
              categoryMap.set(recipe.category, {
                count: 1,
                link:
                  recipe.categoryLink ||
                  `/categories/${recipe.category
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`,
                image: recipe.images?.[0],
              });
            }
          }
        });

        const categories = Array.from(categoryMap.entries()).map(
          ([categoryName, { count, link, image }]) =>
            createCategoryFromName(categoryName, count, link, image)
        );

        return categories.sort(
          (a, b) => (b.recipeCount || 0) - (a.recipeCount || 0)
        );
      },
      `${BASE_URL}/api/categories`,
      {
        tags: ["categories"],
        revalidate: 3600,
      }
    );
  } catch (error) {
    console.error("❌ Failed to fetch categories:", error);
    return [];
  }
}

/**
 * Get best categories with counts
 */
async function getBestCategories(
  limit: number = 5
): Promise<{ category: string; count: number }[]> {
  try {
    return await fetchWithFallback(
      async () => {
        const prisma = await getPrisma();
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
      },
      `${BASE_URL}/api/categories/best?limit=${limit}`,
      {
        tags: ["categories", "best-categories"],
        revalidate: 3600,
      }
    );
  } catch (error) {
    console.error("❌ Failed to fetch best categories:", error);
    throw new Error("Failed to fetch best categories");
  }
}

// ============================================================================
// ARTICLE FUNCTIONS
// ============================================================================

/**
 * Get latest articles
 */
async function getLatestArticles(limit: number = 12): Promise<Article[]> {
  try {
    // For now, using local articles data
    // This can be extended to use database when articles are stored there
    const articles = latestArticles;
    return articles
      .sort((a, b) => {
        const aDate = new Date(a.updatedDate).getTime();
        const bDate = new Date(b.updatedDate).getTime();
        return bDate - aDate;
      })
      .slice(0, limit);
  } catch (error) {
    console.error("❌ Failed to get articles:", error);
    return [];
  }
}

// ============================================================================
// ADMIN CRUD FUNCTIONS
// ============================================================================

/**
 * Admin: Get all recipes for management
 */
async function adminGetAllRecipes(): Promise<Recipe[]> {
  try {
    const baseUrl = isServer ? "" : BASE_URL;
    const response = await fetch(`${baseUrl}/api/recipe`);

    if (!response.ok) {
      throw new Error(`Failed to fetch recipes: ${response.status}`);
    }

    return (await response.json()) as Recipe[];
  } catch (error) {
    console.error("❌ Failed to fetch admin recipes:", error);
    throw new Error("Failed to fetch recipes");
  }
}

/**
 * Admin: Get recipe by ID
 */
async function adminGetRecipeById(id: string): Promise<Recipe | null> {
  try {
    const baseUrl = isServer ? "" : BASE_URL;
    const response = await fetch(`${baseUrl}/api/recipe?id=${id}`);

    if (response.status === 404) return null;
    if (!response.ok) {
      throw new Error(`Failed to fetch recipe: ${response.status}`);
    }

    return (await response.json()) as Recipe;
  } catch (error) {
    console.error("❌ Failed to fetch recipe by ID:", error);
    return null;
  }
}

/**
 * Admin: Create new recipe
 */
async function adminCreateRecipe(
  recipeData: Omit<Recipe, "id">
): Promise<Recipe> {
  try {
    return await apiClient.request<Recipe>("/api/recipe", {
      method: "POST",
      body: JSON.stringify(recipeData),
    });
  } catch (error) {
    console.error("❌ Failed to create recipe:", error);
    throw new Error("Failed to create recipe");
  }
}

/**
 * Admin: Update existing recipe
 */
async function adminUpdateRecipe(
  id: string,
  recipeData: Partial<Recipe>
): Promise<Recipe> {
  try {
    const url = `/api/recipe?id=${encodeURIComponent(id)}`;
    const data = { ...recipeData, id };

    return await apiClient.request<Recipe>(url, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("❌ Failed to update recipe:", error);
    throw new Error("Failed to update recipe");
  }
}

/**
 * Admin: Delete recipe
 */
async function adminDeleteRecipe(id: string): Promise<void> {
  if (IS_DEVELOPMENT) {
    console.log("🗑️ adminDeleteRecipe called with id:", id);
  }

  try {
    const url = `/api/recipe?id=${encodeURIComponent(id)}`;
    await apiClient.delete(url, { id });
  } catch (error) {
    console.error("❌ Failed to delete recipe:", error);
    throw new Error("Failed to delete recipe");
  }
}

// ============================================================================
// EXPORT HELPERS
// ============================================================================

export {
  // Core recipe functions
  getRecipes,
  getRecipesPaginated,
  getRecipe,
  getTrending,
  getRelated,
  getLatest,
  getRecipesByCategory,

  // Category functions
  getCategories,
  getBestCategories,

  // Article functions
  getLatestArticles,

  // Admin functions
  adminGetAllRecipes,
  adminGetRecipeById,
  adminCreateRecipe,
  adminUpdateRecipe,
  adminDeleteRecipe,

  // Revalidation functions
  revalidateRecipeData,
  revalidateAfterNewRecipe,
  revalidateAfterRecipeUpdate,
};
