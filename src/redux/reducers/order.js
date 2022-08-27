import {
    ADD_ORDER_FAIL,
    ADD_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    DELETE_ORDER_SUCCESS,
    GET_ORDERS_FAIL,
    GET_ORDERS_SUCCESS, GET_SUMMARY_FAIL, GET_SUMMARY_SUCCESS
} from "../actions/types";

const initialState = {
    orders: null,
    summary: null,
}

export default function Order(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_ORDERS_SUCCESS:
            return {
                ...state, orders: payload.orders
            }
        case GET_ORDERS_FAIL:
            return {
                ...state, orders: null
            }
        case GET_SUMMARY_SUCCESS:
            return {
                ...state,
                summary: payload.orders_by_month
            }
        case GET_SUMMARY_FAIL:
            return {
                ...state,
            }
        case ADD_ORDER_SUCCESS:
        case ADD_ORDER_FAIL:
        case DELETE_ORDER_SUCCESS:
        case DELETE_ORDER_FAIL:
            return {
                ...state,
            }
        default:
            return state
    }
}