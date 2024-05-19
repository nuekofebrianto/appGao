const initialState = {
    data: [],
    loading: false,
    error: null,
    page: 1,
    endReached: false,
};

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return {
                ...state,
                data: [...state.data, ...action.payload.data],
                loading: false,
                page: action.payload.page,
            };
        case 'FETCH_ERROR':
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case 'END_REACHED':
            return {
                ...state,
                page: action.payload.page,
                endReached: true,
            };
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload,
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
        default:
            return state;
    }
};

export default dataReducer;