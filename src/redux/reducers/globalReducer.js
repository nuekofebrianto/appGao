const initialState = {
    getActivePage: null
}

const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ACTIVE_PAGE': 
            return {
                ...state,
                getActivePage: action.payload.activePage
            }
        default: 
            return state;
    }
};

export default globalReducer;