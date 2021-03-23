import { SET_USER_TIMEZONE } from "../actions/actionTypes";
import { tzStartLoading, tzStopLoading } from './index';
import { getTimeZoneBackend } from '../backend';

export const getUserTimeZone = () => {
    return (dispatch) => {
        dispatch(tzStartLoading());
        getTimeZoneBackend()
            .then(tz => {
                if(tz && tz.timezone){
                    dispatch(setUserTimeZone(tz.timezone));
                }
                dispatch(tzStopLoading());
            })
            .catch(err => {
                console.log({err})
                dispatch(tzStopLoading());
            })
    }
}

export const setUserTimeZone = (timezone) => {
    return {
        type: SET_USER_TIMEZONE,
        payload: timezone
    }
}