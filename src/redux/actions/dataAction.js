import { err } from "react-native-svg/lib/typescript/xml";
import { Cons } from "../../components/Cons";
import axios from "axios";
import { parse } from "@fortawesome/fontawesome-svg-core";

export const fetchData = (page, path, target) => async (dispatch) => {

    dispatch({ type: 'SET_LOADING' + target, payload: true });
    try {

        const response = await axios.get(Cons.apiServer + path + `&page=${page}`, null, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const res = await response.data;
        const datas = await res.data;

        if (Array.isArray(res.data)) {
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
        if (error.response) {
            console.log(target, 'Error Data:', error.response.data);
            console.log(target, 'Error Status:', error.response.status);
            console.log(target, 'Error Headers:', error.response.headers);
        } else if (error.request) {
            console.log(target, 'Error Request:', error.request);
        } else {
            console.log(target, 'Error Message:', error.message);
        }

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

export const approveData = (path, id, target) => async (dispatch) => {

    dispatch({ type: 'SET_LOADING' + target, payload: true });
    try {
        const response = await axios.post(Cons.apiServer + path + `&id=${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const res = await response.data;

        dispatch({
            type: 'APPROVE' + 'TIKET',
            payload: { id: id, data: res },
        });

        dispatch({
            type: 'APPROVE' + 'TIKET_WAITING_APPROVAL',
            payload: { id: id, data: res },
        });

        dispatch({
            type: 'REMOVE' + 'TIKET_WAITING_APPROVAL',
            payload: { id: id },
        });

    } catch (error) {
        if (error.response) {
            console.log(target, 'Error Data:', error.response.data);
            console.log(target, 'Error Status:', error.response.status);
            console.log(target, 'Error Headers:', error.response.headers);
        } else if (error.request) {
            console.log(target, 'Error Request:', error.request);
        } else {
            console.log(target, 'Error Message:', error.message);
        }
        dispatch({
            type: 'FETCH_ERROR' + target,
            payload: error,
        });

    } finally {
        dispatch({ type: 'SET_LOADING' + target, payload: false });
    }
};
