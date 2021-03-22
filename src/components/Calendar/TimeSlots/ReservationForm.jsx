import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { format } from "date-fns";

import { alocateSlot } from '../../../store/actions';
import createNotification from '../../Notifications/createNotification';

const ReservationForm = ({time, onAlocateSlot, hours, currentTime}) => {
    
    const [comment, setComment] = useState('');
    const [userMessage, setUserMessage] = useState(null);

    const onAllocateHandler = () => {
        const currentMinutes = (new Date()).getMinutes();
        currentTime.setHours(hours, currentMinutes);

        onAlocateSlot({comment, date_time: currentTime.toString()}, () => createNotification('success',`You allocated call at ${currentTime.toString()} with following message: ${comment}`));
    };

    useEffect(() => {
        if(!time.available){
            setUserMessage({
                title: 'Your Allocation has been confirmed!',
                datetime: `Date: ${format(currentTime, 'eeee, MMMM d hh:mm')}`,
                comment: `Comment: ${comment}`
            });
        }
    }, [time]);

    const onSubmit = () => {
        setUserMessage(null);
    };

    return (
        <div className="timeslots__reservation-container"  onClick={e => e.stopPropagation()}>
            {
                time.available
                    ? (
                        <div>
                            <input 
                                value={comment} 
                                placeholder="Enter your message"
                                className="timeslots__reservation-container-input" 
                                onChange={(ev) => setComment(ev.target.value)} />
                            <div className="timeslots__reservation-container-button" onClick={() => onAllocateHandler()}>Confirm Call</div>
                        </div>
                    )
                    : userMessage 
                        ?(
                            <div className="timeslots__reservation-container__success" onClick={onSubmit}>
                                <div className="timeslots__reservation-container__success-message">{userMessage.title}</div>
                                <div className="timeslots__reservation-container__success-date">{userMessage.datetime}</div>
                                <div className="timeslots__reservation-container__success-comment">{userMessage.comment}</div>
                            </div>
                        ) : null
            }
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAlocateSlot: (allocation, callback) => dispatch(alocateSlot(allocation, callback))
    }
};

export default connect(null, mapDispatchToProps)(ReservationForm);