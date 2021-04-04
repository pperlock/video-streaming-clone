import React from "react";

import {connect, useSelector} from 'react-redux';

//import styles specific to component
import "./NextVideoSection.scss";

//import any child components to render
import NextVideo from "../NextVideo/NextVideo";


/**
* NEXT VIDEO SECTION COMPONENT
* Useage: Renders the details of a video object
*/

function NextVideoSection (){
    const allSideVideos = useSelector(state => state.sideVideoStore.sideVideos);
    const mainVideo = useSelector(state=>state.mainVideoStore.mainVideo);

    const sideVideos = allSideVideos.filter(video=>video.id!==mainVideo.id);

    return(
        <section className="next-video-section"> 
            <p className="next-video-section__title">NEXT VIDEO</p>

            {/* render a NextVideo component for each object in the sideVideos array */}
            {sideVideos.map((video)=> {
                return (<NextVideo  key={video.id} video={video}/>)
            })} 
        </section>
    );
};


export default connect(null)(NextVideoSection);