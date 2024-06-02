import { err } from "react-native-svg/lib/typescript/xml";
import { Cons } from "../../components/Cons";
import axios from "axios";
import { parse } from "@fortawesome/fontawesome-svg-core";

export const sumData = (path, target) => async (dispatch) => {

    dispatch({ type: 'SET_LOADING' + target, payload: true });
    try {

        const now = new Date();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();

        const response = await axios.get(Cons.apiServer + path + '&bulan=' + month + '&tahun=' + year, null, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        const res = await response.data;

        await dispatch({
            type: 'GET' + target,
            payload: {
                data: res,
                dataChart: [
                    { name: 'All', population: res.all, color: '#f00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
                    { name: 'Complete', population: res.complete, color: '#0f0', legendFontColor: '#7F7F7F', legendFontSize: 15 },
                    { name: 'Waiting Approval', population: res.waiting_approval, color: '#00f', legendFontColor: '#7F7F7F', legendFontSize: 15 },
                    { name: 'Not Yet', population: res.notyet, color: '#ff0', legendFontColor: '#7F7F7F', legendFontSize: 15 }
                ]
            },
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
            type: 'ERROR' + target,
            payload: error,
        });

    } finally {
        dispatch({ type: 'SET_LOADING' + target, payload: false });
    }
};

export const clearSumData = (target) => {
    return {
        type: 'CLEAR_DATA' + target,
    };
};
