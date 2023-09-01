import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  setClickOrderList: false,
  setIsOpen: false,
};

const modalOverlaySlice = createSlice({
  name: "modalOverlay",
  initialState,

  reducers: {
    clickOrderList: (state, action) => {
      state.setClickOrderList = action.payload;
    },

    clickOpen: (state, action) => {
      state.setIsOpen = action.payload;
    },
  },
});

export const { clickOrderList, clickOpen } = modalOverlaySlice.actions;
export default modalOverlaySlice.reducer;
