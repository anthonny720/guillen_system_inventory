import {GET_HISTORY_FAIL, GET_HISTORY_SUCCESS} from "../actions/types";

const initialState = {
    activities: null
};

export default function History(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_HISTORY_SUCCESS:
            return {
                ...state,
                activities: payload.activities
            }
        case GET_HISTORY_FAIL:
            return {
                ...state,
                activities: null
            }
        default:
            return state
    }
}