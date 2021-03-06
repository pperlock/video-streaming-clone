import React from "react";
import {connect, useSelector} from 'react-redux';


// import styling specific to the component
import "./CommentsSection.scss";

//import any child components to be rendered
import CommentForm from "../CommentForm/CommentForm";
import Comment from "../Comment/Comment";



/**
* COMMENTS COMPONENT
* Useage: used to render the details of a comment object
* @param {array[objects]} comments
* @param {function} addComment
* @param {function} deleteComment
*/

function CommentsSection(){

    const comments = useSelector(state=>state.mainVideoStore.mainVideo.comments);

    // sort the comments in descending order
    let sortedComments = comments.sort((a,b) => b.timestamp-a.timestamp);

    return(
        <section className="comments"> 
            {/* use the length of the comments array to dynamically render the number of comments */}
            <h2 className="comments__count"> {comments.length} Comments</h2>
            
            {/* render the comment form component */}
            <CommentForm/>
            
            <div className="comments__list">
                {/* use the sorted array to render a comment component for each object in the array*/}
                 {sortedComments.map((comment)=> {
                    return (<Comment  key={comment.id} commentObject={comment}/>)
                    })
                }  

            </div>
        </section>
    );
};

export default connect(null)(CommentsSection);