import React from 'react';

//import styles specific to component
import "./VideoPlayer.scss";

import {connect, useSelector} from 'react-redux';

/**
* NEXT VIDEO COMPONENT
* Useage: Renders the VideoPlayer object
* @param {object} mainVideo 
*/

function VideoPlayer(){

    const mainVideo = useSelector(state=>state.mainVideoStore.mainVideo);

    // destructure mainVideo object for code readability
    const {image, video, duration} = mainVideo;

    console.log(video);

    console.log("/assets/videos/whisky-reverse.mp4");
    console.log("rendered")
    return(
        <section className = "video">
            <div className="video__wrapper">
                <video className="video__player" poster={image} controls>
                    <source src= {video} type="video/mp4"/>
                    {/* <source type="video/mp4" src= "/assets/videos/whisky-reverse.mp4"/> */}
                    Your browser does not support the video tag.
                </video>
                {/* <div className = "video__controls">
                    <div className="video__controls-play"><img  src="/assets/icons/Icon-play.svg" alt="play button"/></div>
                    <div className="video__controls-scrubber-container">
                        <div className = "video__controls-scrubber-progress"></div>
                        <p className = "video__controls-scrubber-time">00:00 / {duration}</p>
                    </div>
                    <div className="video__controls-right">
                        <img className="video__controls-fullscreen" src="/assets/icons/Icon-fullscreen.svg" alt="make fullscreen"/>
                        <img className="video__controls-volume" src="/assets/icons/Icon-volume.svg" alt="volume"/>
                    </div>
                </div> */}
            </div>
        </section>
    );
};

export default connect(null)(VideoPlayer);