import React, { useState } from 'react';
import { connect } from 'react-redux';
import { alocateSlot } from '../../../store/actions';
import createNotification from '../../Notifications/createNotification';

const ReservationForm = ({time, onAlocateSlot, hours}) => {
    
    const [comment, setComment] = useState('');

    const onAllocateHandler = () => {
        const currentMinutes = (new Date()).getMinutes();
        time.setHours(hours, currentMinutes);
        onAlocateSlot({comment, date_time: time.toString()}, () => createNotification('success',`You allocated call at ${time.toString()} with following message: ${comment}`));
    };

    return (
        <div className="timeslots__reservation-container">
            <input 
                value={comment} 
                placeholder="Enter your message"
                className="timeslots__reservation-container-input" 
                onChange={(ev) => setComment(ev.target.value)} />
            <div className="timeslots__reservation-container-button" onClick={() => onAllocateHandler()}>Confirm Call</div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAlocateSlot: (allocation, callback) => dispatch(alocateSlot(allocation, callback))
    }
};

export default connect(null, mapDispatchToProps)(ReservationForm);