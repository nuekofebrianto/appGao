import { selectItem } from "../actions/dataAction";

const initialState = {
    data: [],
    loading: false,
    error: null,
    page: 1,
    endReached: false,
    selectedItem: null,
};

const reducerName = 'PREVENTIF';

const preventifReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FIRST_FETCH_SUCCESS' + reducerName:
            return {
                ...state,
                data: action.payload.data,
                loading: false,
                page: 2,
                endReached: false,
            };
        case 'FETCH_SUCCESS' + reducerName:
            return {
                ...state,
                data: [...state.data, ...action.payload.data],
                loading: false,
                page: action.payload.page + 1,
                endReached: false,
            };
        case 'FETCH_ERROR' + reducerName:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case 'END_REACHED' + reducerName:
            return {
                ...state,
                endReached: true,
                loading: false,
            };
        case 'SET_LOADING' + reducerName:
            return {
                ...state,
                loading: action.payload,
            };
        case 'SELECT_ITEM' + reducerName:
            return {
                ...state,
                selectedItem: action.payload,
            };
        case 'CLEAR_DATA':
            return {
                ...state,
                data: [],
                loading: false,
                error: null,
                page: 1,
                endReached: false,
            };
        case 'CLEAR_SELECTED_ITEM':
            return {
                ...state,
                selectItem: null
            };
        default:
            return state;
    }
};

export default preventifReducer; 