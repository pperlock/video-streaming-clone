import React from 'react';
import {connect, useSelector, useDispatch} from 'react-redux';
import {Redirect, useHistory} from "react-router-dom";
import axios from 'axios';

//import styles specific to component
import "./VideoDetails.scss";

import {convertToDate} from '../../globalFunctions';

import {updateMainVideo} from '../../actions/mainVideo';
import {updateError} from '../../actions/error';

import {getSideVideos} from '../../actions/sideVideo';

const API_URL = process.env.NODE_ENV === "production" ? 'https://video-streaming-clone.herokuapp.com': 'http://localhost:5000';

/**
* NEXT VIDEO COMPONENT
* Useage: Renders the details of a video object
* @param {object} mainVideo
* @param {function} addComment
* @param {function} deleteComment
*/

function VideoDetails(){

    const history = useHistory();
    const dispatch = useDispatch();
    const mainVideo = useSelector(state=>state.mainVideoStore.mainVideo);
    const sideVideos = useSelector(state=>state.sideVideoStore.sideVideos);
    const error = useSelector(state=>state.errorStore.error);
    const userId = useSelector(state=>state.userStore.user.id);
    const username = useSelector(state=>state.userStore.user.username);

    /**
     * Function: updateVideoLikes
     * Useage: updates the number of likes for the video that is currently rendered onscreen
     */
    const updateVideoLikes = () =>{
        axios.put(`${API_URL}/api/videos/${mainVideo.id}/likes/`)
        .then(res=>{
            dispatch(updateMainVideo(mainVideo.id));
        })
        .catch(err=>{
            dispatch(updateError(err.message))
        });
    }

    const deleteVideo = (videoId)=> {
        axios.delete(`${API_URL}/api/videos/${videoId}`)
        .then(res=>{
            let path = `/home/${username}/video/${sideVideos[0].id}`; 
            history.push(path); 
            dispatch(getSideVideos(sideVideos[0].id));
        })
        .catch(err=>{
            dispatch(updateError(err.message));
        });
    }

    // descontruct mainVideo object for code readability
    const {title, channel, avatar, timestamp, views, likes, description,id} = mainVideo;

     return(
        <>
        {error && <Redirect to="/notfound"/>}
        <section className="video-details">
            
            <h1 className="video-details__title"> {title}</h1>
            <div className = "video-details__middle">
                <div className="video-details__middle--left">
                <div className = "video-details__avatar" style={{ backgroundImage: `url(${avatar})`}}> </div>
                    <h2 className="video-details__owner">{channel}</h2>
                    {/* Render the timestamp in a more readable format */}
                    <h2 className="video-details__date"> {convertToDate(timestamp)}</h2>
                </div>
                <div className="video-details__middle--right">
                    <img className="video-details__icon" src="/assets/icons/Icon-views.svg" alt="views"/>
                    <h2 className="video-details__views"> {views}</h2>
                    <img onClick={updateVideoLikes} className = "video-details__icon video-details__icon-likes" src="/assets/icons/Icon-likes.svg" alt="likes"/>
                    <h2 className="video-details__likes"> {likes}</h2>
                </div>
            </div>
            <div className="video-details__description-wrapper">
                <p className="video-details__description">{description}</p>
                {mainVideo.userId === userId && <button onClick={()=>deleteVideo(id)} className = "video-details__delete-btn" data-tooltip="Delete Video">x</button>}
            </div>
        </section>
        </>
    );
};

export default connect(null)(VideoDetails);