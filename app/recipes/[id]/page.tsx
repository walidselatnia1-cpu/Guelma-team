import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Heart, Share2, Printer, Pin, Send, ArrowDown } from "lucide-react";

import { Card } from "@/components/Card";
import CategoriesSection from "@/components/main/CategoriesSection";
import HeroSection from "@/components/main/HeroSection";
import LatestArticlesSection from "@/components/main/LatestArticlesSection";
import LatestRecipesSection from "@/components/main/LatestRecipesSection";
import TrendingSection from "@/components/main/TrendingSection";
import { Recipe } from "@prisma/client";

const recipes: Recipe[] = [
  {
    id: "1",
    title: "Honey Sesame Chicken and Broccoli",
    description:
      "Crispy chicken and tender broccoli coated in a sweet and savory honey sesame sauce, ready in just 30 minutes. A healthier takeout-style dinner packed with flavor.",
    category: "Evening Meals",
    cuisine: "Chinese",
    difficulty: "Intermediate",
    yield: "4 Servings (4 portions)",
    dietary: "Dairy-Free",
    timing: {
      prepTime: "15 Minutes",
      cookTime: "15 Minutes",
      totalTime: "30 Minutes",
    },
    shortDescription:
      "Crispy chicken and tender broccoli coated in a sweet and savory honey sesame sauce, ready in just 30 minutes. A healthier takeout-style dinner packed with flavor.",

    servings: "4",

    image: "/honey-sesame-chicken.jpg",
    author: "Emily Smith",
    authorImage: "/emily-smith.jpg",
    publishDate: "Mon, 21 Jul 2025 10:56:56 GMT",

    prepTime: "15 Minutes",
    cookTime: "15 Minutes",
    totalTime: "30 Minutes",
    whyYoullLoveThis: [
      "**Quick weeknight solution** - Ready in 30 minutes from start to finish, perfect for busy evenings",
      "**One-pan simplicity** - Everything comes together in one skillet for easy cleanup",
      "**Kid-approved vegetables** - Even picky eaters love broccoli when it's covered in this amazing sauce",
    ],
    rating: 4.8,
    ingredientGuide: [
      {
        ingredient: "Boneless chicken breast",
        description:
          "Cut into uniform pieces for even cooking. The size matters for getting that perfect crispy coating.",
      },
      {
        ingredient: "Fresh broccoli crowns",
        description:
          "Choose bright green florets that are firm and compact. Avoid yellowing or wilted broccoli for best flavor.",
      },
      {
        ingredient: "Sesame oil",
        description:
          "This is what gives the sauce its distinctive nutty flavor. Don't substitute regular oil here.",
      },
      {
        ingredient: "Real honey",
        description:
          "Provides natural sweetness and helps create that glossy sauce coating. Avoid artificial honey substitutes.",
      },
      {
        ingredient: "Fresh ginger and garlic",
        description:
          "These aromatics are crucial for authentic flavor. Pre-minced versions don't have the same impact.",
      },
    ],
    cookingProcess: [
      {
        step: "Broccoli Steaming",
        description:
          "Steam until bright green and tender-crisp. Don't overcook - it should still have a slight bite.",
      },
      {
        step: "Chicken Coating",
        description:
          "The cornstarch creates a light coating that helps the sauce adhere. Make sure each piece is well coated.",
      },
      {
        step: "Sauce Preparation",
        description:
          "Whisk all sauce ingredients together before cooking begins. This ensures even distribution of flavors.",
      },
    ],

    ingredients: [
      {
        section: "Honey Sesame Sauce",
        items: [
          "1/4 cup low sodium soy sauce",
          "2 tbsp water",
          "1 1/2 tbsp sesame oil",
          "3 tbsp honey",
          "1 tbsp rice vinegar",
          "1 tsp fresh ginger, finely grated",
          "2 cloves garlic, minced",
          "1 tbsp sesame seeds",
          "2 tsp cornstarch",
        ],
      },
      {
        section: "Chicken and Vegetables",
        items: [
          "1-1.5 lbs boneless skinless chicken breast, cut into 1-2 inch pieces",
          "2 tbsp cornstarch or arrowroot flour",
          "2 tbsp all-purpose flour",
          "1/2 tsp salt",
          "1/4 tsp black pepper",
          "2 tbsp olive oil",
          "6 cups broccoli florets (about 2 crowns)",
          "2 whole green onions, diced",
          "1 tsp salt for steaming broccoli",
        ],
      },
    ],

    instructions: [
      "Fill a large pot with 2-3 inches of water and add the broccoli florets with 1 teaspoon of salt. Cover and bring to a simmer, then reduce heat to low and steam for 6 minutes until tender-crisp. Drain and rinse with cold water.",
      "In a small bowl, whisk together soy sauce, water, sesame oil, honey, rice vinegar, ginger, garlic, cornstarch, and sesame seeds until smooth.",
      "Place chicken in a large plastic bag. Mix cornstarch, flour, salt, and pepper, then add to the bag. Shake until chicken is evenly coated.",
      "Heat olive oil in a large skillet over medium heat. Add chicken in a single layer, cook undisturbed 2-3 minutes per side until golden brown and cooked through.",
      "Reduce heat to medium-low. Pour in sauce and toss chicken until coated. Simmer until thickened, about 1-2 minutes.",
      "Fold steamed broccoli into the skillet (or combine in a large bowl). Top with diced green onions and serve hot.",
    ],

    notes: [
      "For Whole30 compliance, substitute coconut aminos for soy sauce and arrowroot for cornstarch.",
      "Don’t overcrowd the chicken in the pan—cook in batches if necessary.",
      "Rinsing broccoli with cold water keeps it bright green.",
      "Cornstarch thickens the sauce to the perfect consistency.",
    ],

    tools: [
      "Large pot with lid",
      "12-inch cast iron skillet",
      "Colander strainer",
      "Mixing bowls",
      "Large plastic bag",
      "Whisk",
    ],

    allergyInfo:
      "Contains soy (soy sauce) and sesame. Please check ingredients carefully and consult a health professional if in doubt.",

    nutritionFacts:
      "Approximate per serving: 350-400 calories, 28g protein, 18g fat, 20g carbs. Values may vary depending on exact ingredients used.",
  },
];

const relatedRecipes = [
  { id: "2", title: "Mongolian Beef Noodles", image: "/mongolian-beef.jpg" },
  { id: "3", title: "Italian Drunken Noodles", image: "/italian-noodles.jpg" },
  {
    id: "4",
    title: "Peppercorn Steak with Creamy Sauce",
    image: "/peppercorn-steak.jpg",
  },
  {
    id: "5",
    title: "Sweet & Spicy Korean Fried Chicken",
    image: "/korean-chicken.jpg",
  },
  { id: "6", title: "Tuscan White Bean Soup", image: "/tuscan-soup.jpg" },
  { id: "7", title: "Chicken Parmesan", image: "/chicken-parmesan.jpg" },
];

function getRecipeById(id: string): Recipe | null {
  return recipes.find((recipe) => recipe.id === id) || null;
}

export default function RecipePage({ params }: { params: { id: string } }) {
  const recipe = getRecipeById(params.id);

  if (!recipe) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="main">
        <HeroSection />
        <CategoriesSection />
        <LatestRecipesSection />
        <LatestArticlesSection />
        <TrendingSection />
      </main>
    </div>
  );
}
