import { SET_USER_TIMEZONE } from "../actions/actionTypes";

const initialState = {
    tz: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_TIMEZONE:
            return {
                ...state,
                tz: action.payload
            };
        default:
            return state;
    }
};

export default reducer;
