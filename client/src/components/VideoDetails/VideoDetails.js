import React, {useEffect} from 'react';

import {useSelector, useDispatch} from 'react-redux';
import {getMainVideo} from '../../reducers/mainVideoSlice';

//import styles specific to component
import "./VideoDetails.scss";

import {convertToDate} from '../../globalFunctions';

/**
* NEXT VIDEO COMPONENT
* Useage: Renders the details of a video object
* @param {object} mainVideo
* @param {function} addComment
* @param {function} deleteComment
*/

function VideoDetails({mainVideo, updateVideoLikes}){

    // const dispatch = useDispatch();
    // const video = useSelector(state => state.mainVideo);

    // console.log(video);

    // const videoStatus = useSelector(state => state.mainVideo.status);

    // const error = useSelector(state => state.mainVideo.error);

    // useEffect(()=>{
    //     if(videoStatus === 'pending'){
    //         dispatch(getMainVideo(match.params))
    //     }
    // }, [videoStatus, dispatch])

    // console.log(video.mainVideo);

    // descontruct mainVideo object for code readability
    const {title, channel, timestamp, views, likes, description} = mainVideo;

    return(
        <section className="video-details">
            <h1 className="video-details__title"> {title}</h1>
            <div className = "video-details__middle">
                <div className="video-details__middle--left">
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
            <p className="video-details__description">{description}</p>
        </section>
    );
};

export default VideoDetails;