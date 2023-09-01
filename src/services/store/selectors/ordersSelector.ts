import { RootState } from "../../../utils/types";

export const orderSelector = (store:RootState) => {
  return store.ingredDetails.selctIngredient;
};