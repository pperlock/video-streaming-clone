import React from "react";

// import styling specific to the component
import "./CommentForm.scss";

/**
* COMMENT FORM COMPONENT
* Useage: Renders a comment form
* @param {function} addComment 
*/

function CommentForm ({addComment}){
 
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

export default CommentForm;