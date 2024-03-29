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

export const activePagePreventif = () => {
    return (dispatch) => {
        dispatch({
            type   : 'ACTIVE_PAGE',
            payload: {
                activePage: 'PREVENTIF',
            }
        })

    }
}

export const activePageTicket = () => {
    return (dispatch) => {
        dispatch({
            type   : 'ACTIVE_PAGE',
            payload: {
                activePage: 'TICKET',
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