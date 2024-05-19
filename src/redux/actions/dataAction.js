import { err } from "react-native-svg/lib/typescript/xml";
import { Cons } from "../../components/Cons";

export const fetchData = (page) => async (dispatch) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
        const response = await fetch(Cons.apiServer + '/api/preventif-wisma-report/datatable?page=' + page + '&entries=10');
        const res = await response.json();
        const data = res.data

        if (data.length > 0) {
            if (res.current_page == 1){
                dispatch({
                    type: 'FIRST_FETCH_SUCCESS',
                    payload: { data: res.data, page: res.current_page },
                });
            }else{
                dispatch({
                    type: 'FETCH_SUCCESS',
                    payload: { data: res.data, page: res.current_page },
                });
            }
        } else {
            dispatch({
                type: 'END_REACHED',
            });
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: 'FETCH_ERROR',
            payload: error,
        });
    }
};

export const clearData = () => {
    return {
        type: 'CLEAR_DATA',
    };
};