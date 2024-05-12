import { combineReducers } from "redux";
import userReducer from "./userReducer";
import loginReducer from "./loginReducer";
import globalReducer from "./globalReducer";
import preventifReducer from "./preventifReducer";

export const rootReducer = combineReducers({
    user     : userReducer,
    login    : loginReducer,
    global   : globalReducer,
    preventif: preventifReducer,
});