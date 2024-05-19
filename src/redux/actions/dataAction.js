import { Cons } from "../../components/Cons";

export const fetchData = (page) => async (dispatch) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
        const response = await fetch(Cons.apiServer + '/api/preventif-wisma-report/datatable?page=' + page + '&entries=10');
        const res = await response.json();
        const data = res.data

        console.log('page:', page)
        console.log('current page:', res.current_page)

        if (data.length > 0) {
            dispatch({
                type: 'FETCH_SUCCESS',
                payload: { data: res.data, page: res.current_page },
            });
        } else {
            dispatch({
                type: 'END_REACHED',
                payload: { page: res.current_page }
            });
        }
    } catch (error) {
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