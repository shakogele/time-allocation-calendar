import { SET_USER_TIMEZONE } from "../actions/actionTypes";
import { uiStartLoading, uiStopLoading } from './index';

export const setUserTimeZone = (tz) => {
    return (dispatch) => {
        dispatch(uiStartLoading());
        dispatch(setTimeZone(tz))
        dispatch(uiStopLoading());
    }
}

const setTimeZone = (timezone) => {
    return {
        type: SET_USER_TIMEZONE,
        payload: timezone
    }
}