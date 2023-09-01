import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./reducers/burgerIngredientsSlice";
import constructorReducer from "./reducers/burgerConstructorSlice";
import ingredDetailsReducer from "./reducers/ingredientDetails";
import orderDetailsReducer from "./reducers/orderDetailsSlice";
import modalOverlayReducer from "./reducers/modalOverlaySlice";
import ingredientsTabReducer from "./reducers/ingredientsTab";
import userReducer from "./reducers/userAuthSlice/userAuthSlice";


import { 
  connect as DataWsConnect, 
  disconnect as DataWsDisconnect,
  wsConnecting as DataWsConnecting,
  wsOpen as DataWsOpen,
  wsClose as DataWsClose,
  wsMessage as DataWsNessage,
  wsError as DataWsError 
} from "./reducers/socket/actions";
import { socketMiddleware } from "./middleware/socket-middleware";
import wsReducer from "./reducers/socket";

const wsActions = {
  wsConnect: DataWsConnect,
  wsDisconnect: DataWsDisconnect,
  wsConnecting: DataWsConnecting,
  onOpen: DataWsOpen,
  onClose: DataWsClose,
  onError: DataWsError,
  onMessage: DataWsNessage,
};

const DataMiddleware = socketMiddleware(wsActions);

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constIngredient: constructorReducer,
  ingredDetails: ingredDetailsReducer,
  orderDetails: orderDetailsReducer,
  modalOverlay: modalOverlayReducer,
  ingredientsTab: ingredientsTabReducer,
  userStatus: userReducer,
  wsData: wsReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(DataMiddleware)
  }
});
