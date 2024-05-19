import { err } from "react-native-svg/lib/typescript/xml";
import { Cons } from "../../components/Cons";
import axios from "axios";

export const fetchData = (page, path, target) => async (dispatch) => {
    dispatch({ type: 'SET_LOADING' + target, payload: true });
    try {
        const response = await axios.get(Cons.apiServer + path + `&page=${page}`);

        const res = response.data;
        const data = res.data;

        if (!res || typeof res !== 'object') {
            throw new Error('Invalid JSON response');
        }

        if (data.length > 0) {
            if (res.current_page == 1) {
                dispatch({
                    type: 'FIRST_FETCH_SUCCESS' + target,
                    payload: { data: res.data, page: res.current_page },
                });
            } else {
                dispatch({
                    type: 'FETCH_SUCCESS' + target,
                    payload: { data: res.data, page: res.current_page },
                });
            }
        } else {
            dispatch({
                type: 'END_REACHED' + target,
            });
        }

    } catch (error) {
        dispatch({
            type: 'FETCH_ERROR' + target,
            payload: error,
        });

    } finally {
        dispatch({ type: 'SET_LOADING' + target, payload: false });
    }
};

export const clearData = (target) => {
    return {
        type: 'CLEAR_DATA' + target,
    };
};

export const searchData = (target) => {
    return {
        type: 'SET_SEARCH' + target,
    };
};