import React, { useState, useRef, useEffect } from 'react';
import { FaGlobeAmericas, FaCaretDown, FaCaretUp } from 'react-icons/fa';

import { connect } from 'react-redux';
import { setUserTimeZone } from '../../store/actions';

import timezones from './timezones.json';

const TimeZoneSelector = ({tz, onChangeUserTimeZone}) => {
    
    const dropDownRef = useRef();
    
    const [search, setSearch] = useState('');
    const [dropdownVisible, setDropDownVisible] = useState(false);
    const [dropDownPositions, setDropDownPositions] = useState({});

    useEffect(() => {
        const headerElementPosition = dropDownRef.current.getBoundingClientRect();
        setDropDownPositions({
            left: headerElementPosition.left,
            top: headerElementPosition.top + 40
        })
    }, []);


    const filteredTzs = timezones.filter(tz => {
        if(search.length){
            return tz.name.toLowerCase().includes(search.toLowerCase())
        }else{
            return true
        }
    });

    const timezoneClickHandler = tz => {
        setDropDownVisible(false);
        onChangeUserTimeZone(tz);
    };

    return (
        <div className="time-zone">
            <div className="time-zone__header" onClick={() => setDropDownVisible(true)} ref={dropDownRef}>
                <span><FaGlobeAmericas /></span>
                <span className="time-zone__header-title">{tz.name}</span>
                <span>{dropdownVisible ? <FaCaretUp /> : <FaCaretDown /> }</span>
            </div>
            <div id="overflow" style={{ visibility: dropdownVisible ? 'visible' : 'hidden' }} onClick={() => setDropDownVisible(false)}>
                <div 
                    className="time-zone__dropdown" 
                    style={{ marginLeft: dropDownPositions.left, marginTop: dropDownPositions.top }}
                    onClick={e => e.stopPropagation()}
                    >
                    <div className="time-zone__dropdown-search">
                        <input 
                            value={search}
                            placeholder="Search"
                            className="time-zone__dropdown-search-input" 
                            onChange={(ev) => setSearch(ev.target.value)}
                            />
                    </div>
                    
                    <div className="time-zone__dropdown-zones">
                        {
                            filteredTzs.map(tz => {
                                return (
                                    <div key={tz.name} className="time-zone__dropdown-item" onClick={() => timezoneClickHandler(tz)}>{tz.name}</div>
                                )
                            })
                        }
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        tz: state.tz.tz
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeUserTimeZone: (tz) => dispatch(setUserTimeZone(tz)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeZoneSelector);