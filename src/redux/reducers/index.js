import { combineReducers } from "redux";
import userReducer from "./userReducer";
import loginReducer from "./loginReducer";
import globalReducer from "./globalReducer";
import preventifReducer from "./preventifReducer";
import preventifWaitingApprovalReducer from "./preventifWaitingApprovalReducer";
import searchReducer from "./searchReducer";
import sumPreventifReducer from "./sumPreventifReducer";
import sumTicketReducer from "./sumTicketReducer";
import tiketReducer from "./tiketReducer";
import tiketWaitingApprovalReducer from "./tiketWaitingApprovalReducer";

export const rootReducer = combineReducers({
    user                           : userReducer,
    login                          : loginReducer,
    global                         : globalReducer,
    preventifReducer               : preventifReducer,
    preventifWaitingApprovalReducer: preventifWaitingApprovalReducer,
    searchReducer                  : searchReducer,
    sumPreventifReducer            : sumPreventifReducer,
    sumTicketReducer               : sumTicketReducer,
    tiketReducer                   : tiketReducer,
    tiketWaitingApprovalReducer    : tiketWaitingApprovalReducer,
});