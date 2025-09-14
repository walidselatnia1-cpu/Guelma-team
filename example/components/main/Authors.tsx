import React from "react";
import { Author } from "@/outils/types";
import Image from "next/image";
import { getRecipes } from "@/data/data";

export default async function AuthorsPage() {
  // Get all recipes and extract unique authors
  const recipes = await getRecipes();
  const authorsMap = new Map<string, Author>();
  recipes?.forEach((recipe: any) => {
    if (recipe.author && recipe.author.name) {
      authorsMap.set(recipe.author.name, recipe.author);
    }
  });

  const authors = Array.from(authorsMap.values());

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-8">
        Meet the Authors
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {authors.map((author) => (
          <div
            key={author.name}
            className="bg-white rounded-lg shadow p-6 flex flex-col items-center"
          >
            <img
              src={author.avatar}
              alt={author.name}
              width={80}
              height={80}
              className="rounded-full mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{author.name}</h2>
            <p className="text-gray-600 text-center mb-2">{author.bio}</p>
            <a
              href={author.link}
              className="text-green-600 font-medium hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Profile
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
