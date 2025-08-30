// types/category.ts

import { Category } from "@/outils/types";

// Default responsive sizes
export const CATEGORY_SIZES =
  "(min-width: 1400px) 372px, (min-width: 1040px) calc(33.24vw - 27px), (min-width: 780px) calc(50vw - 29px), calc(100vw - 32px)";
// data.ts

export const categories: Category[] = [
  {
    id: "1",
    slug: "morning_favorite",
    title: "Morning Favorite",
    href: "/categories/morning_favorites",
    alt: "Delicious Morning Favorites",
    description: "Best Breakfast and Brunch Recipes",
    image:
      "https://c.animaapp.com/mer35j4wJPAxku/assets/1753113321200-qrb53cbf.webp",
  },
  {
    id: "2",
    slug: "quick_lunch",
    title: "Quick Lunch",
    href: "/categories/quick_lunch",
    alt: "Tasty Lunch Ideas",
    description: "Fast and Easy Lunch Recipes",
    image:
      "https://c.animaapp.com/mer35j4wJPAxku/assets/1753113321200-qrb53cbf.webp",
  },
  {
    id: "3",
    slug: "family_dinner",
    title: "Family Dinner",
    href: "/categories/family_dinner",
    alt: "Family Dinner Recipes",
    description: "Wholesome Meals for the Whole Family",
    image:
      "https://c.animaapp.com/mer35j4wJPAxku/assets/1753113321200-qrb53cbf.webp",
  },
];
