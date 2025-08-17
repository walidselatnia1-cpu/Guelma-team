import { Search, ChevronRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🍑</span>
              </div>
              <span className="text-xl font-semibold text-gray-800">Recipes By Clare</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-gray-600 hover:text-gray-800 flex items-center gap-1">
                📂 Categories
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800 flex items-center gap-1">
                🧭 Explore
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800 flex items-center gap-1">
                ℹ️ About
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800 flex items-center gap-1">
                📧 Contact
              </a>
              <Search className="w-5 h-5 text-gray-600 cursor-pointer" />
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            HOMEMADE DELIGHTS
            <br />
            FOR YOUR FAMILY TABLE
          </h1>
          <div className="w-12 h-12 bg-orange-400 rounded-full mx-auto mb-6 flex items-center justify-center">
            <Search className="w-6 h-6 text-white" />
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Where everyday cooking at Recipes by Clare transforms into family joy. 🍽️ Our approachable recipes guide you
            through each step to create mouthwatering meals. You don't need to be a professional chef with our basic
            ingredients and clear instructions success comes naturally. From starters to sweet treats, we offer recipes
            that gather your family around the table with love.
          </p>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-8">
            <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Best Categories */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">BEST CATEGORIES</h2>
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
              <ChevronRight className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative rounded-lg overflow-hidden h-48 group cursor-pointer">
              <img src="/placeholder-3amen.png" alt="Breakfast Side" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                <h3 className="text-white font-semibold text-lg p-4">Breakfast Side</h3>
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden h-48 group cursor-pointer">
              <img src="/sauces-and-marinades.png" alt="Sauces & Marinades" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                <h3 className="text-white font-semibold text-lg p-4">Sauces & Marinades</h3>
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden h-48 group cursor-pointer">
              <img src="/placeholder-e6l68.png" alt="Refreshing Drinks" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                <h3 className="text-white font-semibold text-lg p-4">Refreshing Drinks</h3>
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden h-48 group cursor-pointer">
              <img src="/assorted-pasta.png" alt="Pasta Dishes" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                <h3 className="text-white font-semibold text-lg p-4">Pasta Dishes</h3>
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden h-48 group cursor-pointer">
              <img src="/hearty-mains.png" alt="Hearty Mains" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                <h3 className="text-white font-semibold text-lg p-4">Hearty Mains</h3>
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden h-48 group cursor-pointer">
              <img src="/fresh-salads.png" alt="Fresh Salads" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                <h3 className="text-white font-semibold text-lg p-4">Fresh Salads</h3>
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden h-48 group cursor-pointer">
              <img src="/sweet-treats.png" alt="Sweet Treats" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                <h3 className="text-white font-semibold text-lg p-4">Sweet Treats</h3>
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden h-48 group cursor-pointer">
              <img src="/diverse-evening-meals.png" alt="Evening Meals" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                <h3 className="text-white font-semibold text-lg p-4">Evening Meals</h3>
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden h-48 group cursor-pointer">
              <img src="/morning-favorites.png" alt="Morning Favorites" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                <h3 className="text-white font-semibold text-lg p-4">Morning Favorites</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Recipes */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">LATEST RECIPES</h2>
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
              <ChevronRight className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Recipe Card 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
              <img
                src="/honey-sesame-chicken-broccoli.png"
                alt="Honey Sesame Chicken and Broccoli"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Honey Sesame Chicken and Broccoli</h3>
                <p className="text-sm text-gray-600">
                  Crispy chicken and tender broccoli coated in a sweet and savory honey sesame sauce, ready in 30
                  minutes.
                </p>
              </div>
            </div>

            {/* Recipe Card 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
              <img
                src="/cheesy-stuffed-potato-skins.png"
                alt="Cheesy Stuffed Potato Skins"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Cheesy Stuffed Potato Skins</h3>
                <p className="text-sm text-gray-600">
                  Golden crispy potato skins with melted cheese centers, made from simple ingredients in just 30
                  minutes.
                </p>
              </div>
            </div>

            {/* Recipe Card 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
              <img
                src="/placeholder.svg?height=200&width=300"
                alt="Biscuit and Gravy Casserole"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Biscuit and Gravy Casserole</h3>
                <p className="text-sm text-gray-600">
                  Comfort food at its finest - layers of biscuits, sausage, and creamy gravy baked together for the
                  perfect breakfast casserole.
                </p>
              </div>
            </div>

            {/* Recipe Card 4 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
              <img
                src="/placeholder.svg?height=200&width=300"
                alt="Loaded Baked Potatoes Bacon Cheddar"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Loaded Baked Potatoes Bacon Cheddar</h3>
                <p className="text-sm text-gray-600">
                  Perfectly baked fluent potatoes topped with cheddar cheese, crispy bacon, sour cream, and fresh
                  chives.
                </p>
              </div>
            </div>

            {/* Second Row */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
              <img
                src="/placeholder.svg?height=200&width=300"
                alt="Grilled Seafood Boil Skewers"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Grilled Seafood Boil Skewers</h3>
                <p className="text-sm text-gray-600">
                  Southern-style grilled skewers with shrimp, sausage, potatoes, and corn tossed in spicy crab boil
                  garlic butter.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
              <img
                src="/placeholder.svg?height=200&width=300"
                alt="Philly Cheesesteak Grilled Cheese Casserole"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Philly Cheesesteak Grilled Cheese Casserole</h3>
                <p className="text-sm text-gray-600">
                  All the flavors of a Philly cheesesteak sandwich transformed into an easy casserole with layers of
                  bread and melted cheese.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
              <img
                src="/placeholder.svg?height=200&width=300"
                alt="Mozzarella in Carrozza"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Mozzarella in Carrozza</h3>
                <p className="text-sm text-gray-600">
                  Traditional Italian fried mozzarella sandwiches with a golden crispy exterior and perfectly melted
                  cheese center.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
              <img
                src="/placeholder.svg?height=200&width=300"
                alt="Bacon Cheeseburger Grilled Cheese Casserole"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Bacon Cheeseburger Grilled Cheese Casserole</h3>
                <p className="text-sm text-gray-600">
                  The ultimate comfort food combining cheeseburger filling and melted cheese baked to golden perfection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">LATEST ARTICLES</h2>
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
              <ChevronRight className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
              <img
                src="/placeholder.svg?height=200&width=300"
                alt="Pecan Pie Cheesecake"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Pecan Pie Cheesecake</h3>
                <p className="text-sm text-gray-600">
                  This Pecan Pie Cheesecake combines two beloved desserts - creamy cheesecake with the caramelized nutty
                  topping of pecan pie - a perfect holiday dessert.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
              <img
                src="/placeholder.svg?height=200&width=300"
                alt="Fruity Marshmallow Fudge"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Fruity Marshmallow Fudge</h3>
                <p className="text-sm text-gray-600">
                  A colorful, fruity marshmallow fudge made with white chocolate, perfect for parties or as a fun treat.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
              <img
                src="/placeholder.svg?height=200&width=300"
                alt="Lasagna Soup"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Lasagna Soup</h3>
                <p className="text-sm text-gray-600">
                  Lasagna Soup combines the classic flavors of traditional lasagna with hearty broth. It's topped with a
                  blend of ricotta, rich, comforting meal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">TRENDING</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="text-center">
              <img
                src="/placeholder.svg?height=150&width=150"
                alt="Easy Maple Bacon Cinnamon Rolls"
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
              <h4 className="text-sm font-medium text-gray-800">Easy Maple Bacon Cinnamon Rolls</h4>
            </div>

            <div className="text-center">
              <img
                src="/placeholder.svg?height=150&width=150"
                alt="Chicken Broccoli Baked Alfredo"
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
              <h4 className="text-sm font-medium text-gray-800">Chicken Broccoli Baked Alfredo</h4>
            </div>

            <div className="text-center">
              <img
                src="/placeholder.svg?height=150&width=150"
                alt="Shrimp Crab Nacho Corn Dogs"
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
              <h4 className="text-sm font-medium text-gray-800">Shrimp Crab Nacho Corn Dogs</h4>
            </div>

            <div className="text-center">
              <img
                src="/placeholder.svg?height=150&width=150"
                alt="Cheesy Ham Potato Casserole"
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
              <h4 className="text-sm font-medium text-gray-800">Cheesy Ham Potato Casserole</h4>
            </div>

            <div className="text-center">
              <img
                src="/placeholder.svg?height=150&width=150"
                alt="Cheesy Sloppy Joe Garlic Toast"
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
              <h4 className="text-sm font-medium text-gray-800">Cheesy Sloppy Joe Garlic Toast</h4>
            </div>

            <div className="text-center">
              <img
                src="/placeholder.svg?height=150&width=150"
                alt="Cheese Crusted Hawaiian Grilled Cheese"
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
              <h4 className="text-sm font-medium text-gray-800">Cheese Crusted Hawaiian Grilled Cheese</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 border-t">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mb-4">
            <a href="#" className="hover:text-gray-800">
              🏠 Home
            </a>
            <a href="#" className="hover:text-gray-800">
              👤 Authors
            </a>
            <a href="#" className="hover:text-gray-800">
              📂 Categories
            </a>
            <a href="#" className="hover:text-gray-800">
              🧭 Explore
            </a>
            <a href="#" className="hover:text-gray-800">
              📄 Articles
            </a>
            <a href="#" className="hover:text-gray-800">
              🍳 Recipes
            </a>
            <a href="#" className="hover:text-gray-800">
              ℹ️ About
            </a>
            <a href="#" className="hover:text-gray-800">
              🔒 Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-800">
              ❓ FAQs
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <a href="#" className="hover:text-gray-800">
              📧 Contact
            </a>
            <a href="#" className="hover:text-gray-800">
              🔍 Search
            </a>
            <a href="#" className="hover:text-gray-800">
              🗺️ Sitemap
            </a>
            <a href="#" className="hover:text-gray-800">
              📰 Feed
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
