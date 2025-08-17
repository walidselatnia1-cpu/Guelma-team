import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Heart, Share2, Printer, Pin, Send } from "lucide-react"

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-700">
            Home
          </Link>
          <span>›</span>
          <Link href="/recipes" className="hover:text-gray-700">
            Recipes
          </Link>
          <span>›</span>
          <span className="text-gray-900">{recipe.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Recipe Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{recipe.title}</h1>

              <div className="mb-4">
                <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                  Featured in {recipe.category}
                </span>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed mb-6">{recipe.description}</p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mb-6">
                <button className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                  <Pin className="w-4 h-4" />
                  <span>Pin It</span>
                </button>
                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span>Share It</span>
                </button>
                <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  <Send className="w-4 h-4" />
                  <span>Send It</span>
                </button>
                <button className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                  <Printer className="w-4 h-4" />
                  <span>Print It</span>
                </button>
                <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                  Jump To Recipe
                </button>
              </div>

              {/* Author Info */}
              <div className="flex items-center space-x-3 mb-8">
                <Image
                  src="/chef-profile.png"
                  alt={recipe.author}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium text-gray-900">By {recipe.author}</p>
                  <p className="text-sm text-gray-500">Updated on {recipe.publishDate}</p>
                </div>
              </div>
            </div>

            {/* Recipe Image */}
            <div className="relative mb-8">
              <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-medium z-10">
                Pin It
              </div>
              <Image
                src="/honey-sesame-chicken-broccoli.png"
                alt={recipe.title}
                width={800}
                height={500}
                className="w-full rounded-lg object-cover"
              />
              <p className="text-center text-sm text-gray-500 mt-2">{recipe.title} | recipesbyclare.com</p>
            </div>

            {/* Recipe Story */}
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed">
                This honey sesame chicken and broccoli became my go-to weeknight dinner when I got tired of ordering
                takeout and still craved those sweet, savory Chinese flavors but made fresh in my own kitchen. The
                lightly breaded chicken holds onto the glossy honey sesame sauce beautifully, while the tender-crisp
                broccoli adds that fresh contrast you need. What I love most is how the whole thing comes together in
                about 30 minutes, making it faster than delivery but so much better tasting. My kids actually ask for
                the broccoli without complaining when it's coated in this incredible sauce.
              </p>
            </div>

            {/* Why You'll Love This */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Heart className="w-5 h-5 text-green-600 mr-2" />
                Why You'll Love This
              </h3>
              <ul className="space-y-3">
                {recipe.whyYoullLoveThis.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span className="text-gray-700" dangerouslySetInnerHTML={{ __html: point }} />
                  </li>
                ))}
              </ul>
            </div>

            {/* Personal Story */}
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed">
                The first time I made this, my husband took one bite and asked if I secretly ordered Chinese food
                because it tasted so authentic. When he realized I'd made it myself, he was impressed. Now it's become a
                weekly staple. My 8-year-old daughter, who normally picks out every piece of broccoli from any dish,
                actually asks for extra vegetables because she loved how they tasted with the sauce.
              </p>
            </div>

            {/* Essential Ingredient Guide */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Essential Ingredient Guide</h3>
              <div className="space-y-4">
                {recipe.ingredientGuide.map((item, index) => (
                  <div key={index} className="border-l-4 border-orange-400 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-1">**{item.ingredient}**</h4>
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Complete Cooking Process */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Complete Cooking Process</h3>
              <div className="space-y-6">
                {recipe.cookingProcess.map((step, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{step.step}:</h4>
                    <p className="text-gray-700">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Author Profile */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
              <div className="text-center">
                <Image
                  src="/chef-profile.png"
                  alt="Emily Smith"
                  width={80}
                  height={80}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Emily Smith</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Food enthusiast sharing approachable recipes for home cooks of all skill levels.
                </p>
                <p className="text-sm font-medium text-gray-900 mb-4">Follow us on social media</p>
                <div className="flex justify-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">f</span>
                  </div>
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">@</span>
                  </div>
                </div>
              </div>
            </div>

            {/* You Might Also Like */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">You Might Also Like</h3>
              <div className="space-y-4">
                {relatedRecipes.map((relatedRecipe) => (
                  <Link
                    key={relatedRecipe.id}
                    href={`/recipes/${relatedRecipe.id}`}
                    className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  >
                    <Image
                      src="/delicious-recipe-dish.png"
                      alt={relatedRecipe.title}
                      width={60}
                      height={60}
                      className="rounded-lg object-cover"
                    />
                    <span className="text-sm font-medium text-gray-900 flex-1">{relatedRecipe.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
