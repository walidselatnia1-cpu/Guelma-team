import React from "react";

export default function Categories() {
  const categories = [
    {
      title: "Morning Favorite",
      href: "https://recipesbyclare.com/categories/morning-favorites",
      alt: "Delicious Morning Favorites",
      description: "Best Breakfast and Brunch Recipes",
      image:
        "https://recipesbyclare.com/assets/images/1737380777669-8qssdctd.webp",
    },
    {
      title: "Evening Meals",
      href: "https://recipesbyclare.com/categories/evening-meals",
      alt: "Tasty Evening Meals",
      description: "Best Dinner Recipes for Any Night",
      image:
        "https://recipesbyclare.com/assets/images/1737380774193-p4uasq2u.webp",
    },
    {
      title: "Sweet Treats",
      href: "https://recipesbyclare.com/categories/sweet-treats",
      alt: "Irresistible Sweet Treats",
      description: "Best Dessert Recipes for Every Occasion",
      image:
        "https://recipesbyclare.com/assets/images/1737380770370-kum8w9hz.webp",
    },
    {
      title: "Fresh Salads",
      href: "https://recipesbyclare.com/categories/fresh-salads",
      alt: "Crisp and Fresh Salads",
      description: "Best Salad Recipes for Healthy Meals",
      image:
        "https://recipesbyclare.com/assets/images/1737380766083-yjec23y5.webp",
    },
    {
      title: "Hearty Mains",
      href: "https://recipesbyclare.com/categories/hearty-mains",
      alt: "Satisfying Hearty Mains",
      description: "Best Main Dish Recipes for Any Occasion",
      image:
        "https://recipesbyclare.com/assets/images/1737380762153-3pu8uwlo.webp",
    },
    {
      title: "Tasty Bites",
      href: "https://recipesbyclare.com/categories/tasty-bites",
      alt: "Irresistible Tasty Bites",
      description: "Best Appetizer and Snack Recipes",
      image:
        "https://recipesbyclare.com/assets/images/1737380758694-bkjw0cp9.webp",
    },
    {
      title: "Refreshing Drinks",
      href: "https://recipesbyclare.com/categories/refreshing-drinks",
      alt: "Delicious Refreshing Drinks",
      description: "Best Beverage Recipes for Any Occasion",
      image:
        "https://recipesbyclare.com/assets/images/1737380754617-bljffro0.webp",
    },
    {
      title: "Sauces & Marinades",
      href: "https://recipesbyclare.com/categories/sauces-marinades",
      alt: "Flavorful Sauces & Marinades",
      description: "Best Sauce and Marinade Recipes",
      image:
        "https://recipesbyclare.com/assets/images/1737380749959-m5gdpauj.webp",
    },
    {
      title: "Perfect Sides",
      href: "https://recipesbyclare.com/categories/perfect-sides",
      alt: "Delicious Perfect Sides",
      description: "Best Side Dish Recipes",
      image:
        "https://recipesbyclare.com/assets/images/1737380746058-9qlru9dw.webp",
    },
    {
      title: "Freshly Baked Breads",
      href: "https://recipesbyclare.com/categories/freshly-baked-breads",
      alt: "Freshly Baked Breads",
      description: "Best Bread Recipes for Every Occasion",
      image:
        "https://recipesbyclare.com/assets/images/1737380742199-x55hjgf9.webp",
    },
    {
      title: "Essential Condiments",
      href: "https://recipesbyclare.com/categories/essential-condiments",
      alt: "Essential Condiments",
      description: "Best Condiment Recipes to Elevate Any Dish",
      image:
        "https://recipesbyclare.com/assets/images/1737380737537-fmahwj59.webp",
    },
  ];

  return (
    <div className="bg-white text-black mt-4 ">
      <div className="flex flex-col gap-12">
        {/* Header */}
        <div className="flex items-center justify-between uppercase">
          <h2
            className="text-neutral-900 text-[24.96px] font-bold items-center box-border flex basis-[0%] grow leading-[29.952px] md:text-[36.48px] md:leading-[43.776px] after:accent-auto after:bg-zinc-200 after:box-border after:text-neutral-900 after:block after:basis-[0%] after:grow after:text-[24.96px] after:not-italic after:normal-nums after:font-bold after:h-1.5 after:tracking-[normal] after:leading-[29.952px] after:list-outside after:list-disc after:min-w-4 after:outline-dashed after:outline-1 after:text-start after:indent-[0px] after:uppercase after:visible after:w-full after:ml-4 after:rounded-lg after:border-separate after:font-system_ui after:md:text-[36.48px] after:md:leading-[43.776px]
                          before:bg-zinc-200 before:box-border before:text-neutral-900 before:block before:basis-[0%] before:grow before:text-[24.96px] before:not-italic before:normal-nums before:font-bold before:h-1.5 before:tracking-[normal] before:leading-[29.952px] before:list-outside before:list-disc before:min-w-4 before:outline-dashed before:outline-1 before:text-start before:indent-[0px] before:uppercase before:visible before:w-full before:ml-4 before:rounded-lg before:border-separate before:font-system_ui before:md:text-[36.48px] before:md:leading-[43.776px]
          "
          >
            All categories
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="group">
              <a
                href={category.href}
                title={category.description}
                className="block relative overflow-hidden rounded-xl h-40 no-underline transform transition-transform duration-300 hover:scale-105"
              >
                <img
                  className="w-full h-full object-cover object-left-center bg-stone-100 transition-transform duration-300 group-hover:scale-110"
                  height={160}
                  width={372}
                  alt={category.alt}
                  src={category.image}
                  loading="lazy"
                />
                <span
                  className="absolute bottom-0 left-4 text-xl font-black text-black"
                  style={{
                    textShadow:
                      "-1px -1px 0 #f6f5f3, 1px -1px 0 #f6f5f3, -1px 1px 0 #f6f5f3, 1px 1px 0 #f6f5f3",
                  }}
                >
                  {category.title}
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
