// import all modules need for functionality
import React, {useEffect, useState} from 'react';
import {Redirect} from "react-router-dom";
import {connect, useSelector, useDispatch} from 'react-redux';
import axios from 'axios';

//import styles specific to component
import "./HomePage.scss";

//import any child components to be rendered
import NextVideoSection from "../../components/NextVideoSection/NextVideoSection";
import VideoDetails from "../../components/VideoDetails/VideoDetails"
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import CommentsSection from '../../components/CommentsSection/CommentsSection';

import {getSideVideos} from '../../actions/sideVideo';
import {updateMainVideo} from '../../actions/mainVideo';

const HomePage = ({match}) => {

    const dispatch = useDispatch();
    const mainVideo = useSelector(state=>state.mainVideoStore.mainVideo);

    const [error, setError] = useState("");
    
    useEffect(()=>{
        dispatch(getSideVideos(match.params.id));
    },[]);

    useEffect(()=>{
        console.log("useEffect Reached", match.params.id);
        if(sessionStorage.getItem("homeVideo")){
            const videoId = (match.path !== "/" && match.path !== "/notfound") ? match.params.id : JSON.parse(sessionStorage.getItem("homeVideo")).id;
            (mainVideo !== videoId  && match.path !== "/notfound") && dispatch(updateMainVideo(videoId));
        }
    },[match.params.id]);

    /**
     * Function: updateMainVideo
     * Useage: Retrieves mainVideo data from the api associated with a specific video id and updates the state
     * @param {string} currentId 
     */
    // const updateMainVideo = (currentId) => {
    //     // console.log("update current id", currentId);
    //     axios.get(apiUrl + currentId)
    //         .then(res=>{
    //             //if this is the first time the page has been loaded this session and it's the home route then set the first video in the list in the sessionStorage
    //             //this handles any linking back from the upload page from being set as the new home video
    //             if(initial===0 && match.path==="/"){
    //                 sessionStorage.setItem("homeVideo", JSON.stringify(res.data))
    //                 // Once updateVideo has been called, the page has been visited once so update initial to > 0
    //                 setInitial(1);
    //             } 
    //             if(res.data !== "failed"){  
    //             // Update the video to be shown on the video player
    //                 setMainVideo(res.data);
    //             }else{
    //                 setError("Video Not Found");
    //             }
    //         })
    //         .catch(err=>{
    //             console.log(err);
    //             setError(err)
    //         }
    //         )
    //     };


     /** ==================================  Component Rendering =================================================*/
    return (
        <>
        {/* if an error code exists then redirect to the error page */}
        {error!=="" && <Redirect to={{pathname:"/notfound", state:{error:error}}}/>}
            <main className="main">
                {/* pass the necessary keys from the mainVideo object to render the VideoPlayer component */}
                {/* <VideoPlayer mainVideo={mainVideo}/> */}
                <VideoPlayer/>
                <div className = "main__lower">
                    <div className = "main__column-left">
                        {/* render the VideoDetails component using the currentVideo object */}
                        <VideoDetails/>
                        {/* render the CommentSection component using the array stored in the comments key as long as the array is defined*/}
                        {mainVideo.comments && <CommentsSection/>}          
                    </div>
                    <div className = "main__column-right">
                        {/* render the nextVideo section using the array sideVideo objects with the current video being played filtered from the list*/}
                        {/* <NextVideoSection sideVideos = {sideVideos.filter(video=>video.id!==mainVideo.id)}/> */}
                        <NextVideoSection />
                    </div>
                </div>
            </main>
        </>
    )
}

export default connect(null,null)(HomePage);