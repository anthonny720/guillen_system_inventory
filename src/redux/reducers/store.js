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
} from '../actions/types'

const initialState = {
    stores: null,
    inventories: null,
    list: null
}

export default function Store(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_STORES_SUCCESS:
            return {
                ...state,
                stores: payload.stores
            }
        case GET_STORES_FAIL:
            return {
                ...state,
                stores: null
            }
        case GET_STORE_SUCCESS:
            return {
                ...state,
                inventories: payload.stores
            }
        case GET_STORE_FAIL:
            return {
                ...state,
                inventories: null
            }
        case GET_LIST_PRODUCTS_SUCCESS:
            return {
                ...state,
                list: payload.available
            }
        case GET_LIST_PRODUCTS_FAIL:
            return {
                ...state,
                list: null
            }
        case ADD_PRODUCT_TO_STORE_SUCCESS:
        case ADD_PRODUCT_TO_STORE_FAIL:
        case DELETE_PRODUCT_TO_STORE_SUCCESS :
        case DELETE_PRODUCT_TO_STORE_FAIL:
        case UPDATE_PRODUCT_TO_STORE_SUCCESS:
        case UPDATE_PRODUCT_TO_STORE_FAIL:
            return {
                ...state,
            }
        default:
            return state
    }
}