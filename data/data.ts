import { Recipe } from "@/outils/types";
export async function getData(): Promise<Recipe[]> {
  if (process.env.MOCK === "true") {
    return getDummyData(10);
  }

  const response = await fetch("https://api.example.com/recipes");

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
      id: i,
      title: `${data.title}-mock-${i}`,
      shortDescription: `${data.shortDescription} - dummy`,
    });
  }

  return dummyData;
}

export async function getRecipe(id: number): Promise<Recipe | null> {
  const recipes = await getData();

  return recipes[0];
}

export async function getRecipes(): Promise<Recipe[] | null> {
  const recipes = await getData();

  return recipes;
}
