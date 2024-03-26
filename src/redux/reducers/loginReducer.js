import { StorageService } from "../../services/StorageService";

const initialState = {
    getAppGaoUserLogin: null
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USERLOGIN': 
            return {
                ...state,
                getAppGaoUserLogin: action.payload.appGaoUserLogin
            }
        case 'REMOVEUSERLOGIN': 
            return {
                ...state,
                getAppGaoUserLogin: null
            }
        default: 
            return state;
    }
};

export default loginReducer;