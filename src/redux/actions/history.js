import axios from "axios";
import {GET_HISTORY_FAIL, GET_HISTORY_SUCCESS} from "./types";


export const get_history = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/get-history`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_HISTORY_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_HISTORY_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_HISTORY_FAIL
        });

    }
}