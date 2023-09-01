import { RootState } from "../../../../utils/types";

export const constructorSelector = (store:RootState) => {
  return store.constIngredient.draggedIngredients;
};
