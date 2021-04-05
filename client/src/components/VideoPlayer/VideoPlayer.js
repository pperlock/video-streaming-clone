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
    const {image, video} = mainVideo;

    return(
        <section className = "video">
            <div className="video__wrapper">
                <video className="video__player" src={video} poster={image} controls></video>
            </div>
        </section>
    );
};

export default connect(null)(VideoPlayer);