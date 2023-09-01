import { createSelector } from "@reduxjs/toolkit";
import { ingredientSelector } from "./ingredientSelector";
import { constructorSelector } from "./IngredientsSelector/constructorSelector";
import { constructorBunSelector } from "./IngredientsSelector/constructorBunSelector";
import { TingredintsConstructor } from "../../../utils/types";

export const memoIngredientsSelector = createSelector(
  [ingredientSelector, constructorSelector, constructorBunSelector],
  (ingredients, constructorIngredients, constructorBunSelector) => {
    const newIngredientsArr = ingredients.reduce(
      (acc: TingredintsConstructor[] = [], item) => {
        const count = [
          ...constructorIngredients,
          ...constructorBunSelector,
        ].filter((el) => el._id === item._id).length;
        const newIngredient = { ...item, count };
        return [...acc, newIngredient];
      },
      []
    );

    return newIngredientsArr;
  }
);
