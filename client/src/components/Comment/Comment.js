import React from "react";
import {connect, useSelector, useDispatch} from 'react-redux';
import {Redirect} from "react-router-dom";
import axios from 'axios';

// import the timePassed function to be format the timestamps
import {timePassed} from '../../globalFunctions';

// import styling specific to the component
import "./Comment.scss";

import {updateMainVideo} from '../../actions/mainVideo';
import {updateError} from '../../actions/error';

/**
 *COMMENTS COMPONENT
 *Useage: Renders the details of a comment object
 *@param {Object} commentObject 
 *@param {function} deleteComment 
 */

function Comment({commentObject}){

    const dispatch = useDispatch();
    const mainVideo = useSelector(state=>state.mainVideoStore.mainVideo);
    const error = useSelector(state=>state.errorStore.error);

    /**
     * Function: deleteComment
     * Useage: Takes in the id associate with the comment to be deleted, removes it from the api and updates the main video object in state
     * @param {string} commentId 
     */

    const deleteComment = (commentId)=> {
        axios.delete("http://localhost:8080/videos/" + mainVideo.id + "/comments/" + commentId)
        .then(res=>{
            dispatch(updateMainVideo(mainVideo.id));
        })
        .catch(err=>{
            dispatch(updateError(err.message));
        });
    }
    
    const {id, name, timestamp, comment} = commentObject;
    
    return(
        <>
        {error && <Redirect to="/notfound"/>}
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
        </>
    );
};

export default connect(null)(Comment);
