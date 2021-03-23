import React, { useEffect } from 'react'
import { NotificationContainer } from 'react-notifications';
import { connect } from 'react-redux';
import ErrorBoundary from './ErrorBoundary';

import Calendar from '../components/Calendar/Calendar';
import Loader from '../components/Loader';

import { getTimeSlots, getUserTimeZone } from '../store/actions/index';

import 'react-notifications/lib/notifications.css';

const App = ({onGetTimeSlots, onGetUserTimeZone}) => {

    useEffect(() => {
        onGetTimeSlots();
        onGetUserTimeZone();
    }, [onGetTimeSlots])

    return (
        <div className="app">
            <ErrorBoundary>
                <Calendar />
                <NotificationContainer />
                <Loader />
            </ErrorBoundary>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetTimeSlots: () => dispatch(getTimeSlots()),
        onGetUserTimeZone: () => dispatch(getUserTimeZone())
    }
}

export default connect(null, mapDispatchToProps)(App);