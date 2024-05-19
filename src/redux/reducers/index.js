import { combineReducers } from "redux";
import userReducer from "./userReducer";
import loginReducer from "./loginReducer";
import globalReducer from "./globalReducer";
import preventifReducer from "./preventifReducer";
import preventifWaitingApprovalReducer from "./preventifWaitingApprovalReducer";

export const rootReducer = combineReducers({
    user                           : userReducer,
    login                          : loginReducer,
    global                         : globalReducer,
    preventifReducer               : preventifReducer,
    preventifWaitingApprovalReducer: preventifWaitingApprovalReducer,
});