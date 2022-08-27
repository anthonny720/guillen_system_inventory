import {
    ADD_CATEGORY_FAIL,
    ADD_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    DELETE_CATEGORY_SUCCESS,
    GET_CATEGORIES_FAIL,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORY_FAIL,
    GET_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,
    UPDATE_CATEGORY_SUCCESS
} from '../actions/types'

const initialState = {
    categories: null,
    category: null,
    name:null,
}

export default function Category(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: payload.categories
            }
        case GET_CATEGORIES_FAIL:
            return {
                ...state,
                categories: null
            }
        case GET_CATEGORY_SUCCESS:
            return {
                ...state,
                category: payload.result,
                name:payload.category
            }
        case GET_CATEGORY_FAIL:
            return {
                ...state,
                category: null,
                name:null
            }
        case ADD_CATEGORY_SUCCESS:
        case ADD_CATEGORY_FAIL:
        case UPDATE_CATEGORY_SUCCESS:
        case UPDATE_CATEGORY_FAIL:
        case DELETE_CATEGORY_SUCCESS:
        case DELETE_CATEGORY_FAIL:

            return {
                ...state,
            }
        default:
            return state
    }
}