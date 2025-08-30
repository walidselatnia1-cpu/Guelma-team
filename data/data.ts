import { Article, Recipe } from "@/outils/types";
import latestArticles from "./articles";
import { Category } from "@/outils/types";

export async function getData(): Promise<Recipe[]> {
  if (process.env.MOCK === "true") {
    return getDummyData(10);
  }

  const response = await fetch("/api/recipe");

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return (await response.json()) as Recipe[];
}

export async function getDummyData(length: number): Promise<Recipe[]> {
  const data = (await import("../data/recipe.json")).default as any;

  const dummyData: Recipe[] = [];

  for (let i = 0; i < length; i++) {
    dummyData.push({
      ...data,
      id: `dummy-recipe-${i}`,
      title: `${data.title}-mock-${i}`,
      shortDescription: `${data.shortDescription} - dummy`,
      slug: `dummy-recipe-${i}`,
    });
  }

  return dummyData;
}

export async function getDummyDataArticles(): Promise<Article[]> {
  const data = latestArticles;

  const dummyData: Article[] = data;

  return dummyData;
}

export async function getRecipe(slug: string): Promise<Recipe | null> {
  const recipes = await getData();

  return recipes.find((recipe) => recipe.slug == slug) || null;
}

export async function getRecipes(): Promise<Recipe[] | null> {
  const recipes = (await getData()) as Recipe[];

  return recipes;
}

export async function getTrending(limit: number = 10): Promise<Recipe[]> {
  if (process.env.MOCK === "true") {
    const recipes = await getDummyData(20);
    return recipes
      .sort(() => Math.random() - 0.5) // Random sort for trending simulation
      .slice(0, limit)
      .map((recipe) => ({
        ...recipe,
        featuredText: "Trending Now",
      }));
  }

  const response = await fetch(`/api/recipe/trending?limit=${limit}`);

  if (!response.ok) {
    throw new Error("Failed to fetch trending recipes");
  }

  return (await response.json()) as Recipe[];
}

export async function getRelated(
  recipeId: string,
  limit: number = 6
): Promise<Recipe[]> {
  if (process.env.MOCK === "true") {
    const recipes = await getDummyData(15);
    return recipes
      .filter((recipe) => recipe.id !== recipeId)
      .slice(0, limit)
      .map((recipe) => ({
        ...recipe,
        featuredText: "Related Recipe",
      }));
  }

  const response = await fetch(
    `/api/recipe/${recipeId}/related?limit=${limit}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch related recipes");
  }

  return (await response.json()) as Recipe[];
}

// Helper function to create category object from category name and recipes
async function createCategoryFromName(
  categoryName: string,
  allRecipes?: Recipe[]
): Promise<Category> {
  // Create slug from category name - use the raw category name as slug
  const slug = categoryName;

  // Find first recipe in this category to get its image
  let categoryImage = `/images/categories/default.jpg`; // Default fallback

  if (allRecipes) {
    const firstRecipeInCategory = allRecipes.find(
      (recipe) => recipe.category === categoryName
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
    title: categoryName, // Fixed: title should be the category name
    href: `/category/${slug}`, // Fixed: href should be the URL path
    description: `Discover delicious ${categoryName.toLowerCase()} recipes`,
    image: categoryImage, // Use first recipe's image from this category
    alt: `${categoryName} recipes`,
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  };
}

export async function getCategories(): Promise<Category[]> {
  if (process.env.MOCK === "true") {
    const recipes = await getDummyData(10);

    // Extract unique category names
    const uniqueCategoryNames = [
      ...new Set(
        recipes.map((recipe) => recipe.category).filter(Boolean) // Remove null/undefined categories
      ),
    ];

    // Convert to Category objects, passing recipes for image lookup
    const categories = await Promise.all(
      uniqueCategoryNames.map((categoryName) =>
        createCategoryFromName(categoryName, recipes)
      )
    );

    return categories;
  }

  const response = await fetch("/api/recipe/categories");

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  // Get all recipes to find images for categories
  const allRecipes = await getData();

  // If your API returns strings, convert them to Category objects
  const categoryNames = (await response.json()) as string[];
  return Promise.all(
    categoryNames.map((categoryName) =>
      createCategoryFromName(categoryName, allRecipes)
    )
  );
}

export async function getRecipesByCategory(
  category: string,
  limit?: number
): Promise<Recipe[]> {
  if (process.env.MOCK === "true") {
    const recipes = await getDummyData(20);
    const filteredRecipes = recipes.filter(
      (recipe) => recipe?.category?.toLowerCase() === category.toLowerCase()
    );

    return limit ? filteredRecipes.slice(0, limit) : filteredRecipes;
  }

  const url = `/api/recipe/category/${encodeURIComponent(category)}${
    limit ? `?limit=${limit}` : ""
  }`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch recipes for category: ${category}`);
  }

  return (await response.json()) as Recipe[];
}

export async function getLatest(limit: number = 12): Promise<Recipe[]> {
  if (process.env.MOCK === "true") {
    const recipes = await getDummyData(20);
    return recipes
      .sort(
        (a, b) =>
          new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime()
      )
      .slice(0, limit)
      .map((recipe) => ({
        ...recipe,
        featuredText: "Latest Recipe",
      }));
  }

  const response = await fetch(`/api/recipe/latest?limit=${limit}`);
  if (!response.ok) {
    throw new Error("Failed to fetch latest recipes");
  }

  return (await response.json()) as Recipe[];
}

export async function getLatestArticles(
  limit: number = 12
): Promise<Article[]> {
  if (process.env.MOCK === "true") {
    const recipes = await getDummyDataArticles();
    return recipes
      .sort(
        (a, b) =>
          new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime()
      )
      .slice(0, limit)
      .map((recipe) => ({
        ...recipe,
        featuredText: "Latest Recipe",
      }));
  }

  const response = await fetch(`/api/recipe/latest?limit=${limit}`);
  if (!response.ok) {
    throw new Error("Failed to fetch latest recipes");
  }

  return (await response.json()) as Article[];
}

// 🆕 Best categories (popular categories with counts)
export async function getBestCategories(
  limit: number = 5
): Promise<{ category: string; count: number }[]> {
  if (process.env.MOCK === "true") {
    const recipes = await getDummyData(50);

    // Count recipes per category
    const categoryCounts = recipes.reduce((acc, recipe) => {
      if (!recipe.category) return acc;
      acc[recipe.category] = (acc[recipe.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Convert to sorted array
    return Object.entries(categoryCounts)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count) // Sort by popularity
      .slice(0, limit);
  }

  const response = await fetch(`/api/recipe/categories/best?limit=${limit}`);
  if (!response.ok) {
    throw new Error("Failed to fetch best categories");
  }

  return (await response.json()) as { category: string; count: number }[];
}
