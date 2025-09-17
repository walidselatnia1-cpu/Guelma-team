import {
  ChefHat,
  Clock,
  Globe,
  Heart,
  Info,
  Link,
  Star,
  Users,
  Utensils,
} from "lucide-react";
import IngredientsList from "./Ingredients";
import Instruction from "./Instruction";

import { Recipe } from "@/outils/types";

export const Card: React.FC<{
  recipe: Recipe;
}> = ({ recipe }) => {
  return (
    <section
      id="recipe"
      className="recipe bg-[#e7efec]  rounded-[2rem] p-2 mt-12"
    >
      <div className="recipe__wrapper rounded-[2rem] border border-dashed border-gray-900 p-4">
        <h2 className="text-center font-[700]  color-[var(--mo-on-recipe-title)] recipe__title text-3xl font-bold text-[var(--mo-on-recipe-title)] mb-4">
          {recipe.title}
        </h2>
        <p className="text-black mb-6">{recipe.description}</p>

        {/* Timing Info */}
        <div className="grid grid-cols-3 gap-4 text-center border-b border-t border-gray-300 p-4 mb-4">
          <div className="space-y-1">
            <Clock className="h-5 w-5 text-gray-600 mx-auto" />
            <p className="text-xs text-black">Prep Time</p>
            <p className="text-sm font-medium">{recipe?.timing?.prepTime}</p>
          </div>
          <div className="space-y-1">
            <ChefHat className="h-5 w-5 text-gray-600 mx-auto" />
            <p className="text-xs text-black">Cook Time</p>
            <p className="text-sm font-medium">{recipe.timing?.cookTime}</p>
          </div>
          <div className="space-y-1">
            <Clock className="h-5 w-5 text-gray-600 mx-auto" />
            <p className="text-xs text-black">Total Time</p>
            <p className="text-sm font-medium">{recipe.timing?.totalTime}</p>
          </div>
        </div>

        {/* Recipe Details */}
        <div className="space-y-2 text-sm  text-gray-800 mb-4">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span className="">By:</span>
            <span className="font-medium">{recipe.author?.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Utensils className="h-4 w-4 " />
            <span className="">Category:</span>
            <span className="font-medium">Evening Meals</span>
          </div>
          <div className="flex items-center space-x-2">
            <ChefHat className="h-4 w-4 " />
            <span className="">Difficulty:</span>
            <span className="font-medium">{recipe.recipeInfo?.difficulty}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="h-4 w-4 " />
            <span className="">Cuisine:</span>
            <span className="font-medium">{recipe.recipeInfo?.cuisine}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 " />
            <span className="">Yield:</span>
            <span className="font-medium">{recipe.recipeInfo?.servings}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Heart className="h-4 w-4 " />
            <span className="">Dietary:</span>
            <span className="font-medium">{recipe.recipeInfo?.dietary}</span>
          </div>
        </div>

        {/* Ingredients */}
        <h3 className="items-center flex recipe__separator text-2xl font-bold mb-6 font-[700]  text-[var(--mo-on-recipe-title)] recipe__separator after:center after:content-[''] after:block after:w-full after:h-1 after:bg-[var(--mo-recipe-separator)] after:flex-1 after:rounded after:ml-[var(--mo-gap)] after:min-w-[var(--mo-gap)]">
          Ingredients
        </h3>

        <IngredientsList ingredients={recipe.ingredients} />

        {/* Instructions */}
        <h3 className="items-center flex recipe__separator text-2xl font-bold mb-6 font-[700]  text-[var(--mo-on-recipe-title)] recipe__separator after:center after:content-[''] after:block after:w-full after:h-1 after:bg-[var(--mo-recipe-separator)] after:flex-1 after:rounded after:ml-[var(--mo-gap)] after:min-w-[var(--mo-gap)]">
          Instructions
        </h3>
        <div
          id="recipe-instructions"
          className="recipe__interact-list space-y-6 mb-4"
        >
          {recipe.instructions?.map((instruction: any, index) => (
            <Instruction index={index} instruction={instruction.instruction} />
          ))}
        </div>

        {/* Title */}
        <h3 className="items-center flex recipe__separator text-2xl font-bold mb-6 text-[var(--mo-on-recipe-title)] after:content-[''] after:block after:w-full after:h-1 after:bg-[var(--mo-recipe-separator)] after:flex-1 after:rounded after:ml-[var(--mo-gap)] after:min-w-[var(--mo-gap)]">
          <Info className="h-6 w-6 mr-2 text-black" />
          Notes & Tips
        </h3>
        <div className="recipe__wrapper relative recipe-notes mb-8 px-4">
          {/* Notes List */}
          <ul className="space-y-4 text-black max-w-full break-words">
            {recipe.notes.map((note: string, index: number) => (
              <li
                key={index}
                className="relative pl-2 text-base overflow-hidden 
              before:content-[counter(list-counter)]
              before:absolute 
              before:-left-[30px] 
              before:top-0
              before:bg-[var(--mo-recipe-number)]
              before:text-[var(--mo-on-recipe-number)]
              before:w-6 before:h-6
              before:text-center
              before:leading-[24px]
              before:text-[14px]
              before:font-bold
              before:rounded-[24px_24px_10px_24px]
              before:shadow-[0_3px_6px_rgba(0,0,0,0.4)]
              before:text-orange-800
              before:bg-orange-100"
              >
                <span className="block w-full overflow-wrap-break-word hyphens-auto">
                  {note}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Title */}
        <h3 className="items-center flex recipe__separator text-2xl font-bold mb-6 text-[var(--mo-on-recipe-title)] after:content-[''] after:block after:w-full after:h-1 after:bg-[var(--mo-recipe-separator)] after:flex-1 after:rounded after:ml-[var(--mo-gap)] after:min-w-[var(--mo-gap)] mb-8">
          Tools You'll Need
        </h3>

        <div className="recipe__wrapper relative recipe-notes px-2">
          {/* Notes List */}
          <ul className="space-y-4 text-black max-w-full overflow-hidden">
            {recipe?.mustKnowTips?.map((note: string, index: number) => (
              <li
                key={index}
                className="list-disc relative pl-2 text-base marker:text-xl marker:text-gray-600 leading-relaxed break-words"
              >
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
