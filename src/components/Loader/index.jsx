import React from 'react';

import { connect } from 'react-redux';

const Loader = ({isLoading}) => {
    console.log({isLoading})
    return (
        isLoading 
        ? (
            <div className="loader">
                <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            </div> 
        ) : null
    )
}

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading
    }
}

export default connect(mapStateToProps)(Loader);