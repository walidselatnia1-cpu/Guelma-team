export interface Category {
  readonly id: string;
  readonly href: string;
  readonly title: string;
  readonly name: string;
  readonly alt: string;
  readonly imageSrc: string;
  readonly sizes: string;
  readonly imageClassName: string;
}

const CATEGORY_SIZES =
  "(min-width: 1400px) 372px, (min-width: 1040px) calc(33.24vw - 27px), (min-width: 780px) calc(50vw - 29px), calc(100vw - 32px)";

export const categories: Category[] = [
  {
    id: "perfect-sides",
    href: "/categories/perfect-sides",
    title: "Best Side Dish Recipes",
    name: "Perfect Sides",
    alt: "Delicious Perfect Sides",
    imageSrc:
      "https://c.animaapp.com/mer35j4wJPAxku/assets/1737380746058-9qlru9dw.webp",
    sizes: CATEGORY_SIZES,
    imageClassName:
      "aspect-[auto_1920_/_1097] bg-stone-100 box-border h-full object-cover object-[0%_50%] w-full",
  },
  {
    id: "sauces-marinades",
    href: "/categories/sauces-marinades",
    title: "Best Sauce and Marinade Recipes",
    name: "Sauces & Marinades",
    alt: "Flavorful Sauces & Marinades",
    imageSrc:
      "https://c.animaapp.com/mer35j4wJPAxku/assets/1737380749959-m5gdpauj.webp",
    sizes: CATEGORY_SIZES,
    imageClassName:
      "aspect-[auto_1920_/_1097] bg-stone-100 box-border h-full object-cover object-[0%_50%] w-full",
  },
  {
    id: "refreshing-drinks",
    href: "/categories/refreshing-drinks",
    title: "Best Beverage Recipes for Any Occasion",
    name: "Refreshing Drinks",
    alt: "Delicious Refreshing Drinks",
    imageSrc:
      "https://c.animaapp.com/mer35j4wJPAxku/assets/1737380754617-bljffro0.webp",
    sizes: CATEGORY_SIZES,
    imageClassName:
      "aspect-[auto_1920_/_1097] bg-stone-100 box-border h-full object-cover object-[0%_50%] w-full",
  },
  {
    id: "tasty-bites",
    href: "/categories/tasty-bites",
    title: "Best Appetizer and Snack Recipes",
    name: "Tasty Bites",
    alt: "Irresistible Tasty Bites",
    imageSrc:
      "https://c.animaapp.com/mer35j4wJPAxku/assets/1737380758694-bkjw0cp9.webp",
    sizes: CATEGORY_SIZES,
    imageClassName:
      "aspect-[auto_1456_/_816] bg-stone-100 box-border h-full object-cover object-[0%_50%] w-full",
  },
  {
    id: "hearty-mains",
    href: "/categories/hearty-mains",
    title: "Best Main Dish Recipes for Any Occasion",
    name: "Hearty Mains",
    alt: "Satisfying Hearty Mains",
    imageSrc:
      "https://c.animaapp.com/mer35j4wJPAxku/assets/1737380762153-3pu8uwlo.webp",
    sizes: CATEGORY_SIZES,
    imageClassName:
      "aspect-[auto_1920_/_1097] bg-stone-100 box-border h-full object-cover object-[0%_50%] w-full",
  },
  {
    id: "fresh-salads",
    href: "/categories/fresh-salads",
    title: "Best Salad Recipes for Healthy Meals",
    name: "Fresh Salads",
    alt: "Crisp and Fresh Salads",
    imageSrc:
      "https://c.animaapp.com/mer35j4wJPAxku/assets/1737380766083-yjec23y5.webp",
    sizes: CATEGORY_SIZES,
    imageClassName:
      "aspect-[auto_1920_/_1097] bg-stone-100 box-border h-full object-cover object-[0%_50%] w-full",
  },
  {
    id: "sweet-treats",
    href: "/categories/sweet-treats",
    title: "Best Dessert Recipes for Every Occasion",
    name: "Sweet Treats",
    alt: "Irresistible Sweet Treats",
    imageSrc:
      "https://c.animaapp.com/mer35j4wJPAxku/assets/1737380770370-kum8w9hz.webp",
    sizes: CATEGORY_SIZES,
    imageClassName:
      "aspect-[auto_1920_/_1097] bg-stone-100 box-border h-full object-cover object-[0%_50%] w-full",
  },
  {
    id: "evening-meals",
    href: "/categories/evening-meals",
    title: "Best Dinner Recipes for Any Night",
    name: "Evening Meals",
    alt: "Tasty Evening Meals",
    imageSrc:
      "https://c.animaapp.com/mer35j4wJPAxku/assets/1737380774193-p4uasq2u.webp",
    sizes: CATEGORY_SIZES,
    imageClassName:
      "aspect-[auto_1920_/_1097] bg-stone-100 box-border h-full object-cover object-[0%_50%] w-full",
  },
  {
    id: "morning-favorites",
    href: "/categories/morning-favorites",
    title: "Best Breakfast and Brunch Recipes",
    name: "Morning Favorite",
    alt: "Delicious Morning Favorites",
    imageSrc:
      "https://c.animaapp.com/mer35j4wJPAxku/assets/1737380777669-8qssdctd.webp",
    sizes: CATEGORY_SIZES,
    imageClassName:
      "aspect-[auto_1456_/_816] bg-stone-100 box-border h-full object-cover object-[0%_50%] w-full",
  },
] as const;
