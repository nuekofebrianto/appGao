const initialState = {
    getLoading: false,
    getResult : false,
    getError  : false
}

const preventifWaitingApprovalReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'get': 
            return {
                ...state,
                getLoading: action.payload.loading,
                getResult : action.payload.data,
                getError  : action.payload.error
            }
        default: 
            return state
    }
}

export default preventifWaitingApprovalReducer;