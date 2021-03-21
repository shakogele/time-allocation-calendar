import { SET_TIME_SLOTS } from "../actions/actionTypes";
    
const initialState = {
    timeSlots: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case SET_TIME_SLOTS:
        return {
        ...state,
        timeSlots: action.payload
        };
    default:
        return state;
    }
};

export default reducer;
