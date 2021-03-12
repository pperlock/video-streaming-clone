import React from "react";

// import the timePassed function to be format the timestamps
import {timePassed} from '../../globalFunctions';

// import styling specific to the component
import "./Comment.scss";

/**
 *COMMENTS COMPONENT
 *Useage: Renders the details of a comment object
 *@param {Object} commentObject 
 *@param {function} deleteComment 
 */

function Comment({commentObject, deleteComment}){
    
    const {id, name, timestamp, comment} = commentObject;
    
    return(
        <div className = "comment">
            <div className = "comment__avatar"></div>
            <div className = "comment__details"> 
                <div className = "comment__details-header">
                    <h2 className = "comment__details-name">{name}</h2>
                    {/* Uses the global function timePassed to render the timestamp in a more readable format */}
                    <h2 className = "comment__details-timestamp">{timePassed(timestamp)}</h2>
                </div>
                <p className = "comment__details-message">{comment}</p>
                {/* send the id of the comment to be deleted to App.js */}
                <button onClick={()=>deleteComment(id)} className = "comment__delete-btn" data-tooltip="Delete">x</button>
            </div>
        </div>
    );
};

export default Comment;
