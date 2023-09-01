import { RootState } from "../../../utils/types";

export const ingredientSelector = (store:RootState) => {
  return store.ingredients.ingredients;
};
