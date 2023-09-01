import { createAsyncThunk } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { BASE_URL, checkResponse, getEngredients } from "../../../utils/api";

//await нужен когда после ответа мы хотим еще что-то делать, в данном случае он лишний
export const fetchIngredients = createAsyncThunk(
  "ingredients/get",
  getEngredients
);
