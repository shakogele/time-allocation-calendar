import React, { useEffect } from 'react'
import { NotificationContainer } from 'react-notifications';
import { connect } from 'react-redux';
import ErrorBoundary from './ErrorBoundary';

import Calendar from '../components/Calendar/Calendar';
import Loader from '../components/Loader';

import {getTimeSlots } from '../store/actions/index';

import 'react-notifications/lib/notifications.css';

const App = ({onGetTimeSlots}) => {

    useEffect(() => {
        onGetTimeSlots();
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
        onGetTimeSlots: () => dispatch(getTimeSlots())
    }
}

export default connect(null, mapDispatchToProps)(App);