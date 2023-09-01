import { combineReducers } from "redux";
import { wsReducer } from "./reducer";

const reducer = combineReducers({
    wsData: wsReducer
})

export default reducer;