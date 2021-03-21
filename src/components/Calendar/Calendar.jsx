import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfWeek, addDays, startOfMonth, endOfMonth, 
    endOfWeek, isSameMonth, isSameDay } from "date-fns";
import { FaChevronLeft, FaChevronRight, FaClock } from 'react-icons/fa';
import TimeSlots from './TimeSlots/TimeSlots';
import TimeZoneSelector from '../TimeZoneSelector/TimeZoneSelector';

import { compareTwoDates } from '../../utils/helpers';

import { connect } from 'react-redux';

const dateFormat = "MMMM yyyy";

const Calendar = ({timeSlots, mentor}) => {

    const [state, setState] = useState({
        currentMonth: new Date(),
        currentDate: new Date()
    });

    const [selectedDate, setSelectedDate] = useState(null);

    const nextMonthClickHandler = () => {
        setState(prevState => ({
            ...prevState,
            currentMonth: addMonths(prevState.currentMonth, 1)
        }))
    };

    const previousMonthClickHandler = () => {
        setState(prevState => ({
            ...prevState,
            currentMonth: subMonths(prevState.currentMonth, 1)
        }))
    };

    const onDateClick = (day) => {
        if(compareTwoDates(state.currentDate, day)){
            return;
        }
        setSelectedDate(day);
    };

    // const timeSlotsOnSpecificDay = (day) => {
    //     const slots = timeSlots && timeSlots[day.getFullYear()] 
    //     && timeSlots[day.getFullYear()][day.getMonth()] 
    //     && timeSlots[day.getFullYear()][day.getMonth()][day.getDate()];
    //     return slots && slots.length ? slots.length + ` meeting${slots.length>1 ? 's' : ''}` : null
    // }

    const startDate = startOfWeek(state.currentMonth, {weekStartsOn: 1});
    const dayFormat = "eee";
    const days = [];

    for (let i = 0; i < 7; i++) {
        days.push(
            <div className="event__calendar__body-weekdays__day" key={i}>
                {format(addDays(startDate, i), dayFormat)}
            </div>
        );
    }

    const generateDays = () => {

        const { currentMonth, currentDate } = state;
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDateMonth = startOfWeek(monthStart, {weekStartsOn: 1});
        const endDate = endOfWeek(monthEnd, {weekStartsOn: 1});

        const dateFormat = "d";
        const rows = [];
        let days = [];
        let day = startDateMonth;
        let formattedDate = "";
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;
                days.push(
                    <div
                        className={
                            `event__calendar__body-weekcells__row-cell 
                            ${ compareTwoDates(currentDate, day) 
                                ? 'event__calendar__body-weekcells__row-cell--disabled' 
                                : isSameMonth(day, monthStart) ? 'event__calendar__body-weekcells__row-cell--enabled' : ''
                            }`
                        }
                        key={day}
                        onClick={() => isSameMonth(cloneDay, monthStart) ? onDateClick(cloneDay) : null}
                    >
                        {
                            isSameMonth(day, monthStart) 
                            ? (
                                <>
                                    <span className="number">{formattedDate}</span>
                                    {
                                        isSameDay(day, currentDate) ? <span className="event__calendar__body-weekcells__row-cell--currentday"></span> : null
                                    }
                                </>
                            ) : null
                        }
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div className="event__calendar__body-weekcells__row" key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return rows
    }

    return (
        <div className="event">
            <div className="event__mentor">
                <div className="event__mentor-name">{mentor && mentor.name}</div>
                <div className="event__mentor-title">60 Minute Meeting</div>
                <div className="event__mentor-hours"><span className="clock-icon"><FaClock /></span>  1 Hr</div>
            </div>
            <div className="event__calendar">
                <div className="event__calendar__header">
                    <div className="event__calendar-title">Select a Date & Time</div>
                    <div className="event__calendar-nav">
                        <div className="event__calendar-month">{format(state.currentMonth, dateFormat)}</div>
                        <div className="event__calendar-nav-buttons">
                            <div className="event__calendar-button" onClick={previousMonthClickHandler}>
                                <FaChevronLeft />
                            </div>
                            <div className="event__calendar-button" onClick={nextMonthClickHandler}>
                                <FaChevronRight />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="event__calendar__body">
                    <div className="event__calendar__body-weekdays">
                        {days}
                    </div>
                    <div className="event__calendar__body-weekcells">
                        {generateDays()}
                    </div>
                </div>
                <div className="event__calendar__footer">
                    <TimeZoneSelector />
                </div>
            </div>
            <div className="event__allocations">
                <TimeSlots slots={timeSlots} currentDate={selectedDate} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        timeSlots: state.calendar.timeSlots.slotsObject,
        mentor: state.calendar.timeSlots.mentor
    }
};

export default connect(mapStateToProps)(Calendar);