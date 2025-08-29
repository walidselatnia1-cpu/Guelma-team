import { Article, Recipe } from "@/outils/types";
import latestArticles from "./articles";
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

  const dummyData: Recipe[] = [data];

  for (let i = 0; i < length; i++) {
    dummyData.push({
      ...data,
      id: i.toString(),
      title: `${data.title}-mock-${i}`,
      shortDescription: `${data.shortDescription} - dummy`,
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
  const recipes = await getData();

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

export async function getCategories(): Promise<string[]> {
  if (process.env.MOCK === "true") {
    const recipes = await getDummyData(10);
    // Extract unique categories
    const categories = [...new Set(recipes.map((recipe) => recipe.category))];
    return categories.filter(Boolean); // Remove any null/undefined categories
  }

  const response = await fetch("/api/recipe/categories");

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return (await response.json()) as string[];
}

export async function getRecipesByCategory(
  category: string,
  limit?: number
): Promise<Recipe[]> {
  if (process.env.MOCK === "true") {
    const recipes = await getDummyData(20);
    const filteredRecipes = recipes.filter(
      (recipe) => recipe.category.toLowerCase() === category.toLowerCase()
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
