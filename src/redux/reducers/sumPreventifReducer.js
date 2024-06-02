const initialState = {
    data: null,
    loading: false,
    error: null,
    dataChart: [],
};

const reducerName = 'SUM_PREVENTIF';

const sumPreventifReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET' + reducerName:
            return {
                ...state,
                data: action.payload.data,
                dataChart: action.payload.dataChart,
                loading: false,
                error: false,
            };
        case 'SET_LOADING' + reducerName:
            return {
                ...state,
                loading: action.payload,
            };
        case 'ERROR' + reducerName:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case 'CLEAR_DATA' + reducerName:
            return {
                ...state,
                data: null,
                loading: false,
                error: false,
                dataChart: [],
            };
        default:
            return state;
    }
};

export default sumPreventifReducer; 