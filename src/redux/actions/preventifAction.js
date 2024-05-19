import axios from "axios";
import { Cons } from "../../components/Cons";

export const dataTablePreventif = () => {
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
            url    : Cons.apiServer + '/api/preventif-wisma-report/datatable',
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

export const dataTablePreventifWaitingApproval = () => {
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
            url    : Cons.apiServer + '/api/preventif-wisma-report/datatable?filter_columns=status_tiket&filter_keys=WAITING_APPROVAL&entries=10&sort_column=tanggal&sort_type=desc',
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
