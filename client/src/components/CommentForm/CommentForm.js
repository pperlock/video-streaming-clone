import React from "react";
import {connect, useSelector, useDispatch} from 'react-redux';
import axios from 'axios';

// import styling specific to the component
import "./CommentForm.scss";

import {updateMainVideo} from '../../actions/mainVideo';

/**
* COMMENT FORM COMPONENT
* Useage: Renders a comment form
* @param {function} addComment 
*/

function CommentForm (){

    const dispatch = useDispatch();
    const mainVideo = useSelector(state=>state.mainVideoStore.mainVideo);

    /**
     * Function: addComment
     * Useage: Takes in the data from the commentForm input box, posts it to the api and then updates the main video object in state
     * @param {event from button click on CommentForm component} event 
     */    

    const addComment = (event) => {
        event.preventDefault();

        axios.post("http://localhost:8080/videos/" + mainVideo.id + "/comments",
        {
            "name":'Patti Perlock',
            "comment":event.target.message.value
        })
        .then(res=>{
            dispatch(updateMainVideo(mainVideo.id));
        })
        .catch(err=>{
            // setError(err)
        });

        event.target.message.value="";
    };
    
    return(
        <div className="new-comment">
            <div className="new-comment__avatar" style={{ backgroundImage: `url(/assets/images/Mohan-muruge.jpg)`}}></div>
            {/* send the comment to be added to App.js on submit */}
            <form  onSubmit={(event)=>addComment(event)} id="new-comment__form" className="new-comment__form">
                <div className = "new-comment__form-wrapper">
                    <label className="new-comment__form-label" htmlFor="message">JOIN THE CONVERSATION</label>
                    <textarea className="new-comment__form-message" form="new-comment__form" wrap="hard" name="message" id="message" placeholder="Add a new comment" rows="2" cols="20" required></textarea>
                </div>
                <button type="submit" className="new-comment__form-button" id="submit"> COMMENT </button>
            </form>
        </div>  
        );
    };

export default connect(null)(CommentForm);