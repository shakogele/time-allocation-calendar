import { SET_USER_TIMEZONE } from "../actions/actionTypes";
import { tzStartLoading, tzStopLoading } from './index';
import { getTimeZoneBackend } from '../backend';

export const getUserTimeZone = () => {
    return (dispatch, state) => {
        dispatch(tzStartLoading());
        const timezone = state().tz.tz;
        const currentTimeZone = localStorage.getItem('CareerFoundry:userTimezone');
        if(currentTimeZone){
            dispatch(setUserTimeZone(currentTimeZone));
            dispatch(tzStopLoading());
        }else{
            getTimeZoneBackend()
                .then(tz => {
                    if(!timezone && tz){
                        dispatch(setUserTimeZone(tz));
                    }
                    dispatch(tzStopLoading());
                })
                .catch(err => {
                    console.log({err})
                    dispatch(tzStopLoading());
                })
        }
    }
};

export const changeUserTimeZone = (timezone) => {
    return dispatch => {
        const currentTimeZone = localStorage.getItem('CareerFoundry:userTimezone');
        console.log({currentTimeZone})
        if(timezone !== currentTimeZone){
            localStorage.setItem('CareerFoundry:userTimezone', timezone);
        }
        dispatch(setUserTimeZone(timezone));
    }
};

export const setUserTimeZone = (timezone) => {
    return {
        type: SET_USER_TIMEZONE,
        payload: timezone
    }
};