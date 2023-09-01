import { createSlice } from "@reduxjs/toolkit";
import Preloader from "../../../components/preloder/preloder";
import { fetchOrder, sendOrder } from "../../../utils/api";


const initialState = {
  orderData: [],
  order:null,
  clickStutus: false,
  isLoding: false,
  error: " ",
};

const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,

  reducers: {
    clickDetails: (state, action) => {
      state.clickStutus = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending.type, (state, action) => {
        state.isLoding = true;
        state.error = " ";
      })
      .addCase(sendOrder.fulfilled.type, (state, action:any) => {
        state.isLoding = false;
        state.error = " ";
        state.orderData = action.payload.order.number;
      })
      .addCase(sendOrder.rejected.type, (state, action:any) => {
        state.isLoding = false;
        state.error = action.payload;
      })
      
      .addCase(fetchOrder.pending.type, (state, action) => {
        state.isLoding = true;
        state.error = " ";
      })
      .addCase(fetchOrder.fulfilled.type, (state, action:any) => {
        state.isLoding = false;
        state.error = " ";
        state.order = action.payload.orders[0];
      })
      .addCase(fetchOrder.rejected.type, (state, action:any) => {
        state.isLoding = false;
        state.error = action.payload;
      });
  },
});

export const { clickDetails } = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
