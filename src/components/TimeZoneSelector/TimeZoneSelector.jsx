import React, { useState, useRef, useEffect } from 'react';
import { FaGlobeAmericas, FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { listTimeZones } from 'timezone-support';

import { connect } from 'react-redux';
import { changeUserTimeZone } from '../../store/actions';

const TimeZoneSelector = ({tz, onChangeUserTimeZone}) => {
    
    const timezones = listTimeZones();
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
    }, [dropdownVisible]);


    const filteredTzs = timezones.filter(tz => {
        if(search.length){
            return tz.toLowerCase().includes(search.toLowerCase())
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
            <div className="time-zone__header" onClick={() => setDropDownVisible(dropDownRef.current.getBoundingClientRect())} ref={dropDownRef}>
                <span><FaGlobeAmericas /></span>
                <span className="time-zone__header-title">{tz}</span>
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
                                    <div key={tz} className="time-zone__dropdown-item" onClick={() => timezoneClickHandler(tz)}>{tz}</div>
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
        onChangeUserTimeZone: (tz) => dispatch(changeUserTimeZone(tz)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeZoneSelector);