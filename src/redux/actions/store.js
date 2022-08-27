import {
    ADD_PRODUCT_TO_STORE_FAIL,
    ADD_PRODUCT_TO_STORE_SUCCESS,
    DELETE_PRODUCT_TO_STORE_FAIL,
    DELETE_PRODUCT_TO_STORE_SUCCESS,
    GET_LIST_PRODUCTS_FAIL,
    GET_LIST_PRODUCTS_SUCCESS,
    GET_STORE_FAIL,
    GET_STORE_SUCCESS,
    GET_STORES_FAIL,
    GET_STORES_SUCCESS,
    UPDATE_PRODUCT_TO_STORE_FAIL,
    UPDATE_PRODUCT_TO_STORE_SUCCESS,
} from './types'
import axios from 'axios'
import {setAlert} from "./alert";


export const get_stores = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/store/get-stores`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_STORES_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_STORES_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_STORES_FAIL
        });
    }
}

export const get_store = (slug) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/store/get-store/${slug}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_STORE_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_STORE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_STORE_FAIL
        });
    }
}
export const get_store_list_products = (slug) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/store/get-list-available/${slug}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_LIST_PRODUCTS_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_LIST_PRODUCTS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_LIST_PRODUCTS_FAIL
        });
    }
}

export const add_product_to_store = (slug, form) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/store/add-inventory-store/${slug}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: ADD_PRODUCT_TO_STORE_SUCCESS,
                payload: res.data
            });

            dispatch(get_store_list_products(slug))
            dispatch(get_store(slug))
            dispatch(setAlert(res.data.message, 'success'));
        } else {
            dispatch({
                type: ADD_PRODUCT_TO_STORE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_PRODUCT_TO_STORE_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));
    }
}


export const delete_product_to_store = (id, slug) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/store/delete-inventory-store/${id}`, config);
        if (res.status === 200) {
            dispatch({
                type: DELETE_PRODUCT_TO_STORE_SUCCESS,
            });
            dispatch(setAlert(res.data.message, 'success'));
            dispatch(get_store_list_products(slug))
            dispatch(get_store(slug))

        } else {
            dispatch({
                type: DELETE_PRODUCT_TO_STORE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: DELETE_PRODUCT_TO_STORE_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));
    }
}

export const update_product_to_store = (id, slug, count) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/store/update-inventory-store/${id}`, count, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_PRODUCT_TO_STORE_SUCCESS,
            });
            dispatch(setAlert(res.data.message, 'success'));
            dispatch(get_store_list_products(slug))
            dispatch(get_store(slug))
        } else {
            dispatch({
                type: UPDATE_PRODUCT_TO_STORE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_PRODUCT_TO_STORE_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));
    }
}


