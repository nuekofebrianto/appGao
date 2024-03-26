import axios from "axios";
import { Cons } from "../../components/Cons";

export const getUserLogin = () => {
    return (dispatch) => {
        dispatch({
            type   : 'get',
            payload: {
                loading     : true,
                data        : false,
                errorMessage: false
            }
        })

        axios({
            method : 'GET',
            url    : Cons.apiServer + '/api/user-login',
            timeout: 120000,
        })
            .then((response) => {
                dispatch({
                    type   : 'get',
                    payload: {
                        loading     : false,
                        data        : response.data,
                        errorMessage: false
                    }
                })
            })
            .catch((error) => {
                dispatch({
                    type   : 'get',
                    payload: {
                        loading     : false,
                        data        : false,
                        errorMessage: error.message
                    }
                })
            })
    }
}

export const getUserItem = () => {
    return (dispatch) => {
        dispatch({
            type   : 'get',
            payload: {
                loading     : true,
                data        : false,
                errorMessage: false
            }
        })

        axios({
            method : 'GET',
            url    : Cons.apiServer + '/api/user-item',
            timeout: 120000,
        })
            .then((response) => {
                dispatch({
                    type   : 'get',
                    payload: {
                        loading     : false,
                        data        : response.data,
                        errorMessage: false
                    }
                })
            })
            .catch((error) => {
                dispatch({
                    type   : 'get',
                    payload: {
                        loading     : false,
                        data        : false,
                        errorMessage: error.message
                    }
                })
            })
    }
}