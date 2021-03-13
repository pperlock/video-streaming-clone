import React from "react";

import {connect, useSelector, useDispatch} from 'react-redux';

//import styles specific to component
import "./NextVideoSection.scss";

//import any child components to render
import NextVideo from "../NextVideo/NextVideo";


/**
* NEXT VIDEO SECTION COMPONENT
* Useage: Renders the details of a video object
* @param {array[objects]} sideVideos 
*/

function NextVideoSection (){
    const dispatch = useDispatch();
    const sideVideos = useSelector(state => state.sideVideoStore.sideVideos);
    console.log(sideVideos);

    return(
        <section className="next-video-section"> 
            <p className="next-video-section__title">NEXT VIDEO</p>

            {/* <h1> {sideVideos[0].id}</h1> */}

            {/* render a NextVideo component for each object in the sideVideos array */}
            {sideVideos.map((video)=> {
                return (<NextVideo  key={video.id} video={video}/>)
            })} 
        </section>
    );
};

// export default NextVideoSection;

export default connect(null)(NextVideoSection);