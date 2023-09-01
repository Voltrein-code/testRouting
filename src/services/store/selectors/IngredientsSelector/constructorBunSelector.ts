import { RootState } from "../../../../utils/types";

export const constructorBunSelector = (store:RootState) => {
  return store.constIngredient.draggedBun;
};
