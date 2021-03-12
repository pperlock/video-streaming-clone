import React from 'react'

//import styles specific to component
import "./NotFoundPage.scss";

/**
 * Name: NotFoundPage
 * Useage: Pages are redirected to this component when an error has occurred 
 * @param {object} props 
 */

function NotFoundPage(props){
    return (
        <div className="error">
            {/* if there is an error message due to the api call then display that message/othersides Page not found */}
            {!props.location.state ? <h1 className="error__title">Page Not Found</h1> : <h1 className="error__title">{props.location.state.error.message}</h1>}
            <img className="error__image" src="/assets/images/error-image.jpg" alt="error occurred"/>
        </div>
    )
}

export default NotFoundPage
