const initialState = {
    data: [],
    loading: false,
    error: null,
    page: 1,
    endReached: false,
    searchValue: '',
};

const reducerName = 'SEARCH';

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FIRST_FETCH_SUCCESS' + reducerName:
            return {
                ...state,
                data: action.payload.data,
                loading: false,
                page: 1,
                endReached: false,
            };
        case 'FETCH_ERROR' + reducerName:
            console.log('asdasd')
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
        case 'SET_SEARCH' + reducerName:
            return {
                ...state,
                searchValue: action.payload,
            };
        case 'CLEAR_DATA' + reducerName:
            return {
                ...state,
                data: [],
                loading: false,
                error: null,
                page: 1,
                endReached: false,
                searchValue: '',
            };
        default:
            return state;
    }
};

export default searchReducer; 