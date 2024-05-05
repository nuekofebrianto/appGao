export const activePageHome = () => {
    return (dispatch) => {
        dispatch({
            type   : 'ACTIVE_PAGE',
            payload: {
                activePage: 'HOME',
            }
        })

    }
}

export const activePageOperation = () => {
    return (dispatch) => {
        dispatch({
            type   : 'ACTIVE_PAGE',
            payload: {
                activePage: 'OPERATION',
            }
        })

    }
}

export const activePageProfile = () => {
    return (dispatch) => {
        dispatch({
            type   : 'ACTIVE_PAGE',
            payload: {
                activePage: 'PROFILE',
            }
        })

    }
}