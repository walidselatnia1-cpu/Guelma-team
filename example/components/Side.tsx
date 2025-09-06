export default function Side({ recipe }: any) {
  return (
    <div className="relative text-black">
      {/* Dashed border container for the content */}
      <div className="border border-dashed border-black relative mt-20 border-dashed border-[var(--mo-border-width-light)] border-black rounded-2xl bg-stone-100 p-8 pt-24 mb-8">
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-40 h-40 z-10 flex items-center justify-center">
          {/* Avatar wrapper */}
          <div
            className="w-[var(--mo-diameter-img)] h-[var(--mo-diameter-img)] relative z-[1] overflow-hidden rounded-full bg-[var(--mo-author)] mx-auto"
            style={{
              outline: "1px dashed var(--mo-outline-author)",
              outlineOffset: "calc(-1 * var(--mo-spacing) / 4)",
            }}
          >
            {/* Inner dashed ring */}

            <a
              href="https://recipesbyclare.com/authors/emily-smith"
              title="Recipes by Clare | Delicious Home Cooking Made Easy"
              className="no-underline"
            >
              <img
                height={144}
                width={144}
                alt="emily for recipes by clare"
                src={recipe.author.avatar}
                className="block w-full h-full aspect-square object-cover transition-transform duration-300 ease-[cubic-bezier(0.5,1.25,0.75,1.25)] hover:scale-105 rounded-full"
              />
            </a>
          </div>
        </div>

        {/* Content area */}
        <div className=" daflex flex-col justify-center items-center text-center gap-4">
          <a
            className="text-2xl text-black no-underline font-bold block hover:underline"
            href="https://recipesbyclare.com/authors/emily-smith"
            title="Recipes by Clare | Delicious Home Cooking Made Easy"
          >
            Emily Smith
          </a>

          <p className="text-lg m-0 text-gray-700">
            Food enthusiast sharing approachable recipes for home cooks of all
            skill levels.
          </p>

          <div className="flex flex-col gap-4 text-center justify-center">
            <div className="text-xl font-bold">Follow us on social media</div>

            <div className="flex items-center flex-wrap justify-center gap-4">
              <a
                className="rounded-full no-underline transition-all duration-[400ms] inline-flex justify-center items-center w-9 h-9 bg-black hover:scale-110 hover:bg-gray-800"
                href="https://pinterest.com/recipesbyclare"
                rel="noopener noreferrer"
                target="_blank"
                title="Pinterest"
              >
                <svg
                  className="overflow-hidden text-white fill-white w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.626 0 12 0zm0 19c-.721 0-1.418-.109-2.073-.312.286-.465.713-1.227.87-1.835l.437-1.664c.229.436.895.822 1.604.822 2.111 0 3.633-1.941 3.633-4.354 0-2.312-1.888-4.042-4.316-4.042-3.021 0-4.625 2.003-4.625 4.137 0 .695.313 1.558.814 1.834.094.049.144.027.167-.075.017-.076.055-.213.072-.277.023-.087.014-.118-.051-.195-.142-.168-.232-.384-.232-.691 0-1.329.989-2.607 2.667-2.607 1.405 0 2.379.97 2.379 2.346 0 1.528-.638 2.591-1.445 2.591-.433 0-.757-.359-.653-.799.124-.525.365-1.092.365-1.472 0-.339-.181-.622-.558-.622-.442 0-.8.458-.8 1.071 0 .39.132.654.132.654s-.433 1.833-.512 2.164c-.13.555-.092 1.306-.048 1.821C6.247 18.174 4 15.36 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
                </svg>
              </a>

              <a
                className="rounded-full no-underline transition-all duration-[400ms] inline-flex justify-center items-center w-9 h-9 bg-black hover:scale-110 hover:bg-gray-800"
                href="mailto:emily@recipesbyclare.com"
                title="Email"
              >
                <svg
                  className="overflow-hidden text-white fill-white w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12.713l-11.985-9.713h23.971l-11.986 9.713zm-5.425-1.822l-6.575-5.329v12.501l6.575-7.172zm10.85 0l6.575 7.172v-12.501l-6.575 5.329zm-1.557 1.261l-3.868 3.135-3.868-3.135-8.11 8.848h23.956l-8.11-8.848z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold text-center p-3 border border-dashed border-black rounded-2xl bg-stone-100">
          You Might Also Like
        </h2>

        <div className="flex rounded-2xl overflow-hidden border border-dashed border-black bg-stone-100 shadow-md">
          <img
            className="w-32 h-28 object-cover flex-shrink-0"
            alt="Mongolian Ground Beef Noodles"
            src="https://recipesbyclare.com/cdn-cgi/image/fit=contain,width=480,format=auto/assets/images/1737383298828-rtr6ha63.webp"
          />
          <div className="flex flex-col justify-around p-6">
            <a
              href="https://recipesbyclare.com/recipes/mongolian-ground-beef-noodles"
              title="Mongolian Ground Beef Noodles - Quick & Flavorful Weeknight Dinner"
              className="text-black no-underline font-bold text-xl leading-snug hover:underline"
            >
              Mongolian Beef Noodles
            </a>
          </div>
        </div>

        <div className="flex rounded-2xl overflow-hidden border border-dashed border-black bg-stone-100 shadow-md">
          <img
            className="w-32 h-28 object-cover flex-shrink-0"
            alt="Italian Drunken Noodles"
            src="https://recipesbyclare.com/cdn-cgi/image/fit=contain,width=480,format=auto/assets/images/1737383326056-s1z0mv5j.webp"
          />
          <div className="flex flex-col justify-around p-6">
            <a
              href="https://recipesbyclare.com/recipes/italian-drunken-noodles"
              title="Italian Drunken Noodles - Savory & Flavorful Pasta Dish"
              className="text-black no-underline font-bold text-xl leading-snug hover:underline"
            >
              Italian Drunken Noodles
            </a>
          </div>
        </div>

        <div className="flex rounded-2xl overflow-hidden border border-dashed border-black bg-stone-100 shadow-md">
          <img
            className="w-32 h-28 object-cover flex-shrink-0"
            alt="Peppercorn Steak with Creamy Sauce"
            src="https://recipesbyclare.com/cdn-cgi/image/fit=contain,width=480,format=auto/assets/images/1737383114546-eksc0q7w.webp"
          />
          <div className="flex flex-col justify-around p-6">
            <a
              href="https://recipesbyclare.com/recipes/peppercorn-steak-with-creamy-sauce-recipe"
              title="Peppercorn Steak with Creamy Sauce Recipe | Gourmet Steak Dinner"
              className="text-black no-underline font-bold text-xl leading-snug hover:underline"
            >
              Peppercorn Steak with Creamy Sauce
            </a>
          </div>
        </div>

        <div className="flex rounded-2xl overflow-hidden border border-dashed border-black bg-stone-100 shadow-md">
          <img
            className="w-32 h-28 object-cover flex-shrink-0"
            alt="A close-up image of crispy, glazed chicken pieces topped with sesame seeds and green onion."
            src="https://recipesbyclare.com/cdn-cgi/image/fit=contain,width=480,format=auto/assets/images/1737386372107-h4irh94n.webp"
          />
          <div className="flex flex-col justify-around p-6">
            <a
              href="https://recipesbyclare.com/recipes/sweet-spicy-korean-chicken"
              title="Sweet & Spicy Korean Fried Chicken Wings Recipe"
              className="text-black no-underline font-bold text-xl leading-snug hover:underline"
            >
              Sweet & Spicy Korean Fried Chicken
            </a>
          </div>
        </div>

        <div className="flex rounded-2xl overflow-hidden border border-dashed border-black bg-stone-100 shadow-md">
          <img
            className="w-30 h-28 object-cover"
            alt="A bowl of hearty soup with ground meat, white beans, vegetables, and fresh herbs, served on a wooden table alongside a slice of bread."
            src="https://recipesbyclare.com/cdn-cgi/image/fit=contain,width=480,format=auto/assets/images/1737386402177-lnnu1pei.webp"
          />
          <div className="flex flex-col justify-around p-6">
            <a
              href="https://recipesbyclare.com/recipes/tuscan-white-bean-soup"
              title="Easy Tuscan White Bean Soup with Sausage - One Pot Recipe"
              className="text-black no-underline font-bold text-xl leading-snug hover:underline"
            >
              Tuscan White Bean Soup
            </a>
          </div>
        </div>

        <div className="flex rounded-2xl overflow-hidden border border-dashed border-black bg-stone-100 shadow-md">
          <img
            className="w-30 h-28 object-cover"
            alt="A plate of breaded chicken topped with marinara sauce and melted cheese, accompanied by spaghetti garnished with parsley."
            src="https://recipesbyclare.com/cdn-cgi/image/fit=contain,width=480,format=auto/assets/images/1737386406200-l74w6zel.webp"
          />
          <div className="flex flex-col justify-around p-6">
            <a
              href="https://recipesbyclare.com/recipes/chicken-parmesan"
              title="Easy Chicken Parmesan Recipe - Classic Italian Dinner"
              className="text-black no-underline font-bold text-xl leading-snug hover:underline"
            >
              Chicken Parmesan
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
