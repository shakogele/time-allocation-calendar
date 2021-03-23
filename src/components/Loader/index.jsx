import React from 'react';

import { connect } from 'react-redux';

const Loader = ({isLoading, isTzLoading}) => {
    return (
        isLoading || isTzLoading 
        ? (
            <div className="loader">
                <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            </div> 
        ) : null
    )
}

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
        isTzLoading: state.ui.tzIsLoading
    }
}

export default connect(mapStateToProps)(Loader);