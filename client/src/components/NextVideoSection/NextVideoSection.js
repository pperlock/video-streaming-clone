import React, {useEffect} from "react";

import {useSelector, useDispatch} from 'react-redux';
import {getSideVideos} from '../../reducers/sideVideosSlice';

//import styles specific to component
import "./NextVideoSection.scss";

//import any child components to render
import NextVideo from "../NextVideo/NextVideo";



/**
* NEXT VIDEO SECTION COMPONENT
* Useage: Renders the details of a video object
* @param {array[objects]} sideVideos 
*/

function NextVideoSection ({sideVideos}){
    const dispatch = useDispatch();
    const videos = useSelector(state => state.sideVideos);

    const videoStatus = useSelector(state => state.sideVideos.status);

    const error = useSelector(state => state.sideVideos.error);

    useEffect(()=>{
        if(videoStatus === 'pending'){
            dispatch(getSideVideos())
        }
    }, [videoStatus, dispatch])

    console.log(videos.sideVideos);
    return(
        <section className="next-video-section"> 
            <p className="next-video-section__title">NEXT VIDEO</p>

            {/* render a NextVideo component for each object in the sideVideos array */}
            {videos.sideVideos.map((video)=> {
                    return (<NextVideo  key={video.id} video={video}/>)
                    })
                } 
            {/* {sideVideos.map((video)=> {
                    return (<NextVideo  key={video.id} video={video}/>)
                    })
                }  */}
        </section>
    );
};

export default NextVideoSection;