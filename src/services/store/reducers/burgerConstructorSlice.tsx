import { createSlice } from "@reduxjs/toolkit";
import { TingredintsConstructor } from "../../../utils/types";

type Tinitial = {
  draggedBun: TingredintsConstructor[],
  draggedIngredients: TingredintsConstructor[],
}

export const initialState: Tinitial = {
  draggedBun: [],
  draggedIngredients: [],
};

const burgerConstructorSlice = createSlice({
  name: "constIngredient",
  initialState,

  reducers: {
    addBun: (state, action) => {
      state.draggedBun = [action.payload];
    },

    addIngredient: (state, action) => {
      state.draggedIngredients = [...state.draggedIngredients, action.payload];
    },

    moveIngredients: (state, action) => {
      const { indexFrom, indexTo, ingredient } = action.payload;
      state.draggedIngredients.splice(indexFrom, 1);
      state.draggedIngredients.splice(indexTo, 0, ingredient);
    },

    deliteIngredient: (state, action) => {
      state.draggedIngredients = [
        ...state.draggedIngredients.filter(
          (item) => item._uuid !== action.payload
        ),
      ];
    },

    clearOrder: (state, action) => {
      state.draggedIngredients = action.payload;
      state.draggedBun = action.payload;
    },
  },
});

export const {
  addBun,
  addIngredient,
  deliteIngredient,
  moveIngredients,
  clearOrder,
} = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
