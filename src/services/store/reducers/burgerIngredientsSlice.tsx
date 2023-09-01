import { TingredintsConstructor } from "../../../utils/types";
import { fetchIngredients } from "./ingredientQuery";
import { createSlice } from "@reduxjs/toolkit";


type Tinitial = {
  ingredients: TingredintsConstructor[],
  isLoding: boolean,
  error: string,
}

export const initialState:Tinitial = {
  ingredients: [],
  isLoding: false,
  error: " ",
};

const burgerIngredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // Добавьте редукторы для дополнительных типов действий здесь
      .addCase(fetchIngredients.pending.type, (state) => {
        state.isLoding = true;
        state.error = " ";
      })
      .addCase(fetchIngredients.fulfilled.type, (state, action:any) => {
        state.isLoding = false;
        state.error = " ";
        state.ingredients = action.payload.data;
      })
      .addCase(fetchIngredients.rejected.type, (state, action:any) => {
        state.isLoding = false;
        state.error = action.payload;
      });
  },
});

export default burgerIngredientsSlice.reducer;
