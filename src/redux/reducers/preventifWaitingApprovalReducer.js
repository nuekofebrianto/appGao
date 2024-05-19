const initialStates = {
    data: [],
    loading: false,
    error: null,
    page: 1,
    endReached: false,
};

const reducerName = 'PREVENTIF_WAITING_APPROVAL';

const preventifWaitingApprovalReducer = (state = initialStates, action) => {
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

export default preventifWaitingApprovalReducer;