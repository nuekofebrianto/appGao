import axios from "axios";
import { Cons } from "../../components/Cons";
import { StorageService } from "../../services/StorageService";

export const getLoginUser = () => {
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

export const getAppGaoUserLogin = () => {
    return (dispatch) => {
        StorageService.getItemObject('appGaoUserLogin')
            .then(value => {
                dispatch({
                    type   : 'USERLOGIN',
                    payload: {
                        appGaoUserLogin: value,
                    }
                })
            });
    }
}

export const removeAppGaoUserLogin = () => {
    return (dispatch) => {
        StorageService.removeItem('appGaoUserLogin')
        dispatch({
            type   : 'REMOVEUSERLOGIN',
            payload: {
                appGaoUserLogin: null,
            }
        })

    }
}
