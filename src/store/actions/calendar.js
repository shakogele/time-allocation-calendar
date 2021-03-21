import { SET_TIME_SLOTS } from "../actions/actionTypes";
import { uiStartLoading, uiStopLoading } from './index';

import { getTimeSlotsBackend, alocateSlotBackend } from '../backend';
import { addAllocationToSlotsObject } from '../../utils/helpers';
import { MENTOR_ID } from '../constants';

export const getTimeSlots = () => {
    return (dispatch) => {
        dispatch(uiStartLoading());
        getTimeSlotsBackend(MENTOR_ID)
            .then(resp => {
                dispatch(setTimeSlots(resp))
                dispatch(uiStopLoading());
            })
            .catch(err => {
                console.log({err})
            })
    }
};

export const alocateSlot = (allocation, callback) => {
    return (dispatch, state) => {
        dispatch(uiStartLoading());        
        alocateSlotBackend(allocation)
            .then(resp => {
                if(resp.success){
                    const calendarObject = JSON.parse(JSON.stringify(state().calendar.timeSlots));
                    const slotsObject = calendarObject.slotsObject;
                    addAllocationToSlotsObject(slotsObject, allocation);
                    dispatch(setTimeSlots(calendarObject));
                    callback && callback();
                }
                dispatch(uiStopLoading());
            })
            .catch(err => {
                console.log({err})
            })
    }
}

const setTimeSlots = (timeSlotsArray) => {
    return {
        type: SET_TIME_SLOTS,
        payload: timeSlotsArray
    }
}