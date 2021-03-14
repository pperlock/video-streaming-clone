import React from 'react';
import {connect, useSelector} from 'react-redux';

//import styles specific to component
import "./NotFoundPage.scss";

/**
 * Name: NotFoundPage
 * Useage: Pages are redirected to this component when an error has occurred 
 * @param {object} props 
 */

function NotFoundPage(){

    const mainError = useSelector(state=>state.mainVideoStore.error);
    const sideError = useSelector(state=>state.sideVideoStore.error);
    const apiError = useSelector(state=>state.errorStore.error);

    const error = apiError ? apiError : (sideError ? sideError : mainError);

    console.log(error);

    return (
        <div className="error">
            {/* if there is an error message due to the api call then display that message/othersides Page not found */}
            {!error ? <h1 className="error__title">Page Not Found</h1> : <h1 className="error__title">{error}</h1>}
            <img className="error__image" src="/assets/images/error-image.jpg" alt="error occurred"/>
        </div>
    )
}

export default connect(null,null)(NotFoundPage);
