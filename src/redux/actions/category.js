import {
    ADD_CATEGORY_FAIL,
    ADD_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    DELETE_CATEGORY_SUCCESS,
    GET_CATEGORIES_FAIL,
    GET_CATEGORIES_SUCCESS, GET_CATEGORY_FAIL, GET_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,
    UPDATE_CATEGORY_SUCCESS,
} from './types'
import axios from 'axios'
import {setAlert} from "./alert";


export const get_categories = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/category/get-categories`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_CATEGORIES_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_CATEGORIES_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_CATEGORIES_FAIL
        });
    }
}

export const add_category = (form) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/category/add-category`, form, config);
        if (res.status === 201) {
            dispatch({
                type: ADD_CATEGORY_SUCCESS,
            });
            dispatch(get_categories())
            dispatch(setAlert(res.data.message, 'success'));

        } else {
            dispatch({
                type: ADD_CATEGORY_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_CATEGORY_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));

    }
}
export const delete_category = (id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/category/delete-category/${id}`, config);
        if (res.status === 200) {
            dispatch({
                type: DELETE_CATEGORY_SUCCESS,
            });
            dispatch(get_categories())
            dispatch(setAlert(res.data.message, 'success'));

        } else {
            dispatch({
                type: DELETE_CATEGORY_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: DELETE_CATEGORY_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));
    }
}
export const update_category = (form, id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/category/update-category/${id}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_CATEGORY_SUCCESS,
            });
            dispatch(get_categories())
            dispatch(setAlert(res.data.message, 'success'));
        } else {
            dispatch({
                type: UPDATE_CATEGORY_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_CATEGORY_FAIL
        });
        dispatch(setAlert(err.response.data['error'], 'error'));
    }
}
export const detail_category = (slug) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/category/detail-category/${slug}`,  config);
        if (res.status === 200) {
            dispatch({
                type: GET_CATEGORY_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_CATEGORY_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_CATEGORY_FAIL
        });
    }
}

