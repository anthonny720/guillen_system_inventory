import {
    ADD_ORDER_FAIL,
    ADD_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    DELETE_ORDER_SUCCESS,
    GET_ORDERS_FAIL,
    GET_ORDERS_SUCCESS,
    GET_SUMMARY_FAIL,
    GET_SUMMARY_SUCCESS
} from './types'
import axios from 'axios'
import {setAlert} from "./alert";
import {get_store, get_stores} from "./store";

export const get_orders = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/order/get-orders`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_ORDERS_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_ORDERS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_ORDERS_FAIL
        });
    }
}
export const add_order = (form, slug) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/order/add-order`, form, config);
        if (res.status === 200) {
            dispatch({
                type: ADD_ORDER_SUCCESS, payload: res.data
            });
            dispatch(setAlert(res.data.message, 'success'));
            dispatch(get_store(slug))
            dispatch(get_orders)
        } else {
            dispatch({
                type: ADD_ORDER_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_ORDER_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}
export const delete_order = (id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/order/delete-order/${id}`, config);
        if (res.status === 200) {
            dispatch({
                type: DELETE_ORDER_SUCCESS
            });
            dispatch(setAlert(res.data.message, 'success'));
            dispatch(get_orders())
            dispatch(get_stores())
            dispatch(get_summary())
        } else {
            dispatch({
                type: DELETE_ORDER_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: DELETE_ORDER_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}
export const get_summary = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/order/summary`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_SUMMARY_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_SUMMARY_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_SUMMARY_FAIL
        });
    }
}

