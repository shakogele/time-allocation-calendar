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
            const timingArray = generateTiming(slots[year][month][day], currentDate);
            setSlotItems(timingArray)
        }
    }, [currentDate, slots]);

    const allocationClickHandler = (time, index) => {
        if(time.available){
            selectedSlotIndex !== index ? setSelectedSlotIndex(index) : setSelectedSlotIndex(null);
        }else{
            createNotification('error', `This time slot is ${time.status ? time.status : 'Unavailable'}, please choose another one!`)
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
                                <span className={`timeslots__item-availability`}>{time.status}</span>
                                {
                                    selectedSlotIndex === index
                                        ? (
                                            <ReservationForm time={time} hours={index} currentTime={currentDate}/>
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