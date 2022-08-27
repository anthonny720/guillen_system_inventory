import {
    ADD_INVENTORY_FAIL,
    ADD_INVENTORY_SUCCESS,
    DELETE_INVENTORY_FAIL,
    DELETE_INVENTORY_SUCCESS,
    GET_INVENTORY_FAIL,
    GET_INVENTORY_SUCCESS,
    UPDATE_INVENTORY_FAIL,
    UPDATE_INVENTORY_SUCCESS,
} from '../actions/types'

const initialState = {
    inventories: null,
}

export default function Inventory(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case GET_INVENTORY_SUCCESS:
            return {
                ...state,
                inventories: payload.inventories
            }
        case GET_INVENTORY_FAIL:
            return {
                ...state,
                inventories: null
            }
        case ADD_INVENTORY_SUCCESS:
        case ADD_INVENTORY_FAIL:
        case UPDATE_INVENTORY_FAIL:
        case UPDATE_INVENTORY_SUCCESS:
        case DELETE_INVENTORY_FAIL:
        case DELETE_INVENTORY_SUCCESS:
            return {
                ...state,
            }
        default:
            return state
    }
}