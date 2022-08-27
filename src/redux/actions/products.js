import {
    ADD_INVENTORY_FAIL,
    ADD_INVENTORY_SUCCESS,
    DELETE_INVENTORY_FAIL,
    DELETE_INVENTORY_SUCCESS,
    GET_INVENTORY_FAIL,
    GET_INVENTORY_SUCCESS,
    UPDATE_INVENTORY_FAIL,
    UPDATE_INVENTORY_SUCCESS,
} from './types'
import axios from 'axios'
import {setAlert} from "./alert";


export const get_inventories = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/inventory/get-inventories`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_INVENTORY_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_INVENTORY_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_INVENTORY_FAIL
        });
    }
}
export const add_product = (form) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/inventory/add-inventory`, form, config);
        if (res.status === 201) {
            dispatch({
                type: ADD_INVENTORY_SUCCESS,
            });
            dispatch(get_inventories())
            dispatch(setAlert(res.data.message, 'success'));

        } else {
            dispatch({
                type: ADD_INVENTORY_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_INVENTORY_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}
export const delete_product = (id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/inventory/delete-inventory/${id}`, config);
        if (res.status === 200) {
            dispatch({
                type: DELETE_INVENTORY_SUCCESS,
            });
            dispatch(get_inventories())
            dispatch(setAlert(res.data.message, 'success'));

        } else {
            dispatch({
                type: DELETE_INVENTORY_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: DELETE_INVENTORY_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}
export const update_product = (form, id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/inventory/update-inventory/${id}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_INVENTORY_SUCCESS,
            });
            dispatch(get_inventories())
            dispatch(setAlert(res.data.message, 'success'));

        } else {
            dispatch({
                type: UPDATE_INVENTORY_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_INVENTORY_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}

