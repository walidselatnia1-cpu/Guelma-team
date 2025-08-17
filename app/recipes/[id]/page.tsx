import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Heart, Share2, Printer, Pin, Send, ArrowDown, Clock, ChefHat, Users, Star } from "lucide-react"

interface Recipe {
  id: string
  title: string
  category: string
  description: string
  image: string
  author: string
  authorImage: string
  publishDate: string
  prepTime: string
  cookTime: string
  servings: string
  difficulty: string
  rating: number
  ingredients: string[]
  instructions: string[]
  whyYoullLoveThis: string[]
  ingredientGuide: { ingredient: string; description: string }[]
  cookingProcess: { step: string; description: string }[]
}

const recipes: Recipe[] = [
  {
    id: "1",
    title: "Honey Sesame Chicken and Broccoli",
    category: "Tasty Evening Meals",
    description:
      "This healthier takeout-style dish features lightly breaded chicken and steamed broccoli tossed in a homemade honey sesame sauce with ginger and garlic.",
    image: "/honey-sesame-chicken.jpg",
    author: "Emily Smith",
    authorImage: "/emily-smith.jpg",
    publishDate: "Mon, 21 Jul 2025 10:56:56 GMT",
    prepTime: "15 mins",
    cookTime: "20 mins",
    servings: "4",
    difficulty: "Easy",
    rating: 4.8,
    ingredients: [
      "1 lb boneless chicken breast, cut into bite-sized pieces",
      "2 cups fresh broccoli florets",
      "1/4 cup cornstarch",
      "2 eggs, beaten",
      "1/4 cup honey",
      "3 tbsp soy sauce",
      "2 tbsp sesame oil",
      "2 cloves garlic, minced",
      "1 tsp fresh ginger, grated",
      "2 tbsp sesame seeds",
      "2 green onions, sliced",
    ],
    instructions: [
      "Steam broccoli until tender-crisp, about 4-5 minutes. Set aside.",
      "Coat chicken pieces in cornstarch, then dip in beaten eggs.",
      "Heat oil in a large skillet over medium-high heat. Cook chicken until golden and cooked through.",
      "In a small bowl, whisk together honey, soy sauce, sesame oil, garlic, and ginger.",
      "Add sauce to the skillet with chicken and toss to coat.",
      "Add steamed broccoli and toss gently to combine.",
      "Sprinkle with sesame seeds and green onions before serving.",
    ],
    whyYoullLoveThis: [
      "**Quick weeknight solution** - Ready in 30 minutes from start to finish, perfect for busy evenings",
      "**One-pan simplicity** - Everything comes together in one skillet for easy cleanup",
      "**Kid-approved vegetables** - Even picky eaters love broccoli when it's covered in this amazing sauce",
    ],
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
        description: "This is what gives the sauce its distinctive nutty flavor. Don't substitute regular oil here.",
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
        description: "Steam until bright green and tender-crisp. Don't overcook - it should still have a slight bite.",
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
  },
]

const relatedRecipes = [
  { id: "2", title: "Mongolian Beef Noodles", image: "/mongolian-beef.jpg" },
  { id: "3", title: "Italian Drunken Noodles", image: "/italian-noodles.jpg" },
  { id: "4", title: "Peppercorn Steak with Creamy Sauce", image: "/peppercorn-steak.jpg" },
  { id: "5", title: "Sweet & Spicy Korean Fried Chicken", image: "/korean-chicken.jpg" },
  { id: "6", title: "Tuscan White Bean Soup", image: "/tuscan-soup.jpg" },
  { id: "7", title: "Chicken Parmesan", image: "/chicken-parmesan.jpg" },
]

function getRecipeById(id: string): Recipe | null {
  return recipes.find((recipe) => recipe.id === id) || null
}

export default function RecipePage({ params }: { params: { id: string } }) {
  const recipe = getRecipeById(params.id)

  if (!recipe) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">🍎</span>
              </div>
              <span className="text-xl font-serif text-gray-900">Recipes By Clare</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/categories" className="text-gray-600 hover:text-gray-900 font-medium">
                Categories
              </Link>
              <Link href="/recipes" className="text-gray-600 hover:text-gray-900 font-medium">
                Explore
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 font-medium">
                About
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 font-medium">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="main">
        {/* Landing Section */}
        <section className="landing bg-gradient-to-b from-orange-50 to-white">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="landing__wrapper max-w-4xl">
              <div className="landing__content">
                {/* Breadcrumb */}
                <ol className="breadcrumb flex items-center space-x-2 text-sm text-gray-500 mb-6">
                  <li className="breadcrumb__item">
                    <Link href="/" className="hover:text-gray-700">
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb__item">
                    <Link href="/recipes" className="hover:text-gray-700">
                      Recipes
                    </Link>
                  </li>
                  <li className="breadcrumb__item">
                    <span className="text-gray-900">{recipe.title}</span>
                  </li>
                </ol>

                <h1 className="landing__title text-4xl md:text-5xl font-bold text-gray-900 mb-4">{recipe.title}</h1>

                <p className="text-lg text-gray-700 mb-4">
                  Featured in{" "}
                  <Link href="/categories/evening-meals" className="text-orange-600 hover:text-orange-700 font-medium">
                    {recipe.category}
                  </Link>
                  .
                </p>

                <div className="landing__tldr text-lg text-gray-700 mb-8 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                  {recipe.description}
                </div>

                {/* Action Buttons */}
                <div className="actions flex flex-wrap gap-3 mb-8">
                  <button className="icon-wrapper flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                    <Pin className="w-4 h-4" />
                    <span>Pin it</span>
                  </button>
                  <button className="icon-wrapper flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span>Share it</span>
                  </button>
                  <button className="icon-wrapper flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    <Send className="w-4 h-4" />
                    <span>Send it</span>
                  </button>
                  <button className="icon-wrapper flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                    <Printer className="w-4 h-4" />
                    <span>Print it</span>
                  </button>
                  <button className="icon-wrapper flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                    <ArrowDown className="w-4 h-4" />
                    <span>Jump To Recipe</span>
                  </button>
                </div>

                {/* Author Meta */}
                <div className="meta flex items-center space-x-4">
                  <Link href="/authors/emily-smith">
                    <Image
                      src="/chef-profile.png"
                      alt={recipe.author}
                      width={60}
                      height={60}
                      className="meta__img rounded-full"
                    />
                  </Link>
                  <div className="meta__content text-sm text-gray-600">
                    <div className="mb-1">
                      <span>By </span>
                      <Link href="/authors/emily-smith" className="font-semibold text-gray-900 hover:text-orange-600">
                        {recipe.author}
                      </Link>
                    </div>
                    <div>
                      <span>Updated on {recipe.publishDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Section with Sidebar Layout */}
        <section className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="template-main-sidebar grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="template-main-sidebar__main lg:col-span-2">
              <article className="article">
                {/* Main Figure */}
                <figure className="pin-wrapper relative mb-8">
                  <Image
                    src="/honey-sesame-chicken-broccoli.png"
                    alt={recipe.title}
                    width={1024}
                    height={1024}
                    className="w-full rounded-lg object-cover"
                  />
                  <button className="pin absolute top-4 right-4 flex items-center space-x-2 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors">
                    <Pin className="w-4 h-4" />
                    <span className="text-sm">Pin it</span>
                  </button>
                  <figcaption className="text-center text-sm text-gray-500 mt-2">
                    {recipe.title} | recipesbyclare.com
                  </figcaption>
                </figure>

                {/* Article Content */}
                <div className="article__wrapper prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-8">
                    This honey sesame chicken and broccoli became my go-to weeknight dinner when I got tired of ordering
                    takeout but still craved those sweet, savory Chinese flavors. The light coating on the chicken
                    creates this perfect crispy exterior that holds onto the glossy honey sesame sauce beautifully,
                    while the tender-crisp broccoli adds that fresh contrast you need. What I love most is how the whole
                    thing comes together in about 30 minutes, making it faster than delivery but so much better tasting.
                    My kids actually eat the broccoli without complaining when it's coated in this incredible sauce.
                  </p>

                  {/* Why You'll Love This */}
                  <aside className="note bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                    <h2 className="icon-wrapper flex items-center text-xl font-bold text-gray-900 mb-4">
                      <Heart className="w-5 h-5 text-green-600 mr-2" />
                      <span>Why You'll Love This</span>
                    </h2>
                    <ul className="space-y-3">
                      {recipe.whyYoullLoveThis.map((point, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-600 mr-2">•</span>
                          <span className="text-gray-700" dangerouslySetInnerHTML={{ __html: point }} />
                        </li>
                      ))}
                    </ul>
                  </aside>

                  <p className="text-gray-700 leading-relaxed mb-8">
                    The first time I made this, my husband took one bite and asked if I'd secretly ordered Chinese food
                    because it tasted so authentic. When he realized I'd made it myself, he immediately requested it for
                    the following week's meal plan. My daughter, who normally picks out every piece of broccoli from any
                    dish, actually asked for extra vegetables because she loved how they tasted with the sauce.
                  </p>

                  {/* Essential Ingredient Guide */}
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Essential Ingredient Guide</h2>
                  <ul className="space-y-4 mb-8">
                    {recipe.ingredientGuide.map((item, index) => (
                      <li key={index} className="border-l-4 border-orange-400 pl-4">
                        <strong className="text-gray-900">{item.ingredient}:</strong> {item.description}
                      </li>
                    ))}
                  </ul>

                  {/* Complete Cooking Process */}
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Cooking Process</h2>
                  <dl className="space-y-6 mb-8">
                    {recipe.cookingProcess.map((step, index) => (
                      <div key={index}>
                        <dt className="font-semibold text-gray-900 mb-2">{step.step}:</dt>
                        <dd className="text-gray-700 bg-gray-50 p-4 rounded-lg">{step.description}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>

              {/* Interactive Recipe Card Section */}
              <section id="recipe" className="recipe bg-white border border-gray-200 rounded-lg p-8 mt-12">
                <div className="recipe__wrapper">
                  <h2 className="recipe__title text-3xl font-bold text-gray-900 mb-4">{recipe.title}</h2>
                  <p className="text-gray-600 mb-6">{recipe.description}</p>

                  {/* Recipe Times */}
                  <div className="recipe__times grid grid-cols-3 gap-4 mb-8">
                    <div className="recipe__times-item text-center">
                      <div className="icon-wrapper flex flex-col items-center">
                        <Clock className="w-6 h-6 text-orange-500 mb-2" />
                        <strong className="text-sm text-gray-900">Prep Time</strong>
                      </div>
                      <span className="recipe__highlight text-orange-600 font-semibold">{recipe.prepTime}</span>
                    </div>
                    <div className="recipe__times-item text-center">
                      <div className="icon-wrapper flex flex-col items-center">
                        <ChefHat className="w-6 h-6 text-orange-500 mb-2" />
                        <strong className="text-sm text-gray-900">Cook Time</strong>
                      </div>
                      <span className="recipe__highlight text-orange-600 font-semibold">{recipe.cookTime}</span>
                    </div>
                    <div className="recipe__times-item text-center">
                      <div className="icon-wrapper flex flex-col items-center">
                        <Users className="w-6 h-6 text-orange-500 mb-2" />
                        <strong className="text-sm text-gray-900">Servings</strong>
                      </div>
                      <span className="recipe__highlight text-orange-600 font-semibold">{recipe.servings}</span>
                    </div>
                  </div>

                  {/* Recipe Info */}
                  <div id="recipe-info" className="space-y-3 mb-8 text-sm">
                    <div className="icon-wrapper flex items-center">
                      <ChefHat className="w-4 h-4 text-gray-500 mr-2" />
                      <div>
                        <strong>By:</strong>
                        <Link href="/authors/emily-smith" className="text-orange-600 hover:text-orange-700 ml-1">
                          {recipe.author}
                        </Link>
                      </div>
                    </div>
                    <div className="icon-wrapper flex items-center">
                      <Star className="w-4 h-4 text-gray-500 mr-2" />
                      <div>
                        <strong>Difficulty:</strong>
                        <span className="recipe__highlight text-orange-600 ml-1">{recipe.difficulty}</span>
                      </div>
                    </div>
                  </div>

                  {/* Ingredients */}
                  <h3 className="recipe__separator text-2xl font-bold text-gray-900 mb-6">Ingredients</h3>
                  <div id="recipe-ingredients" className="recipe__interact-list space-y-3 mb-8">
                    {recipe.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex items-start">
                        <span className="recipe__interact-list-number bg-orange-100 text-orange-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 cursor-pointer hover:bg-orange-200 transition-colors">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="recipe__interact-list-content text-gray-700 flex-1">{ingredient}</span>
                      </div>
                    ))}
                  </div>

                  {/* Instructions */}
                  <h3 className="recipe__separator text-2xl font-bold text-gray-900 mb-6">Instructions</h3>
                  <div id="recipe-instructions" className="recipe__interact-list space-y-6">
                    {recipe.instructions.map((instruction, index) => (
                      <div key={index} className="flex items-start">
                        <span className="recipe__interact-list-number bg-orange-100 text-orange-800 rounded-full px-3 py-1 text-sm font-semibold mr-4 cursor-pointer hover:bg-orange-200 transition-colors whitespace-nowrap">
                          Step {String(index + 1).padStart(2, "0")}
                        </span>
                        <p className="recipe__interact-list-content text-gray-700 flex-1 leading-relaxed">
                          {instruction}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="template-main-sidebar__sidebar lg:col-span-1">
              {/* Author Profile */}
              <div className="author bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <div className="author__img mb-4">
                  <Link href="/authors/emily-smith">
                    <Image
                      src="/chef-profile.png"
                      alt={recipe.author}
                      width={120}
                      height={120}
                      className="rounded-full mx-auto"
                    />
                  </Link>
                </div>
                <div className="author__body text-center">
                  <Link
                    href="/authors/emily-smith"
                    className="author__title text-xl font-bold text-gray-900 hover:text-orange-600 block mb-2"
                  >
                    {recipe.author}
                  </Link>
                  <p className="text-gray-600 text-sm mb-4">
                    Food enthusiast sharing approachable recipes for home cooks of all skill levels.
                  </p>

                  <div className="social">
                    <div className="social__title text-sm font-medium text-gray-900 mb-3">
                      Follow us on social media
                    </div>
                    <div className="social__items flex justify-center space-x-3">
                      <a
                        href="https://pinterest.com/recipesbyclare"
                        className="social__item w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors"
                      >
                        <Pin className="w-4 h-4" />
                      </a>
                      <a
                        href="mailto:emily@recipesbyclare.com"
                        className="social__item w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Recipes */}
              <div className="related_entries bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="related_entries__title text-lg font-bold text-gray-900 mb-4">You Might Also Like</h2>
                <div className="space-y-4">
                  {relatedRecipes.map((relatedRecipe) => (
                    <div key={relatedRecipe.id} className="related_entries__item">
                      <Link
                        href={`/recipes/${relatedRecipe.id}`}
                        className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                      >
                        <Image
                          src="/delicious-recipe-dish.png"
                          alt={relatedRecipe.title}
                          width={60}
                          height={60}
                          className="related_entries__item-img rounded-lg object-cover"
                        />
                        <div className="related_entries__item-content flex-1">
                          <span className="text-sm font-medium text-gray-900">{relatedRecipe.title}</span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  )
}
