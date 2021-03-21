import { SET_USER_TIMEZONE } from "../actions/actionTypes";

const initialState = {
    tz: {
        name: "Pacific/Honolulu",
        gmt: "(GMT-10:00) Hawaii Time",
        shortGmt: "GMT-10"
    }
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
