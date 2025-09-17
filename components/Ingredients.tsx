import Ingredient from "./Ingredient";
import Recipe from "@/outils/types";
const IngredientsList = ({
  ingredients,
}: {
  ingredients: Recipe["ingredients"];
}) => {
  return (
    <div
      id="recipe-ingredients"
      className="recipe__interact-list space-y-3 mb-8"
    >
      {ingredients.map((ingredientGroup: any, index: any) => (
        <div key={index} className="mb-4">
          <h4 className="text-lg font-bold text-black mb-2">
            {ingredientGroup.section}
          </h4>
          <ul className="space-y-2">
            {ingredientGroup.items.map((ingredient: any, itemIndex: any) => (
              <Ingredient ingredient={ingredient} index={itemIndex} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default IngredientsList;
