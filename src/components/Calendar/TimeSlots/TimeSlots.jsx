import React, { useState, useEffect } from 'react';
import ReservationForm from './ReservationForm';
import createNotification from '../../Notifications/createNotification';
import { format } from "date-fns";

import { generateTiming } from '../../../utils/helpers';

const TimeSlots = ({slots, currentDate}) => {

    const [sloItems, setSlotItems] = useState([]);
    const [selectedSlotIndex, setSelectedSlotIndex] = useState();
    
    useEffect(() => {
        if(currentDate){
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const day = currentDate.getDate();
            const timingArray = generateTiming(slots[year][month][day]);
            setSlotItems(timingArray)
        }
    }, [currentDate, slots]);

    const allocationClickHandler = (time, index) => {
        if(time.available){
            setSelectedSlotIndex(index);
        }else{
            createNotification('error', 'This time slot is already taken, please choose another one!')
        }
    };

    return (
        <div className="timeslots">
            <div className="timeslots__header">
                {currentDate && format(currentDate, 'eeee, MMMM d')}
            </div>
            <div className="timeslots__body">
                {
                    sloItems.map((time, index) => {
                        return (
                            <div 
                                key={time.interval} 
                                className={`timeslots__item ${!time.available ? 'timeslots__item--busy' : ''}`} 
                                onClick={() => allocationClickHandler(time, index)}
                                >
                                <span className="timeslots__item-interval">{time.interval}</span>
                                <span className={`timeslots__item-availability`}>{time.available ? 'available' : 'allocated'}</span>
                                {
                                    selectedSlotIndex === index 
                                        ? (
                                            <ReservationForm time={currentDate} hours={index} />
                                        )
                                        : null
                                }
                                
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default TimeSlots;