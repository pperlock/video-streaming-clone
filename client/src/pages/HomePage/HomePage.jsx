// import all modules need for functionality
import React, {useEffect} from 'react';
import {Redirect} from "react-router-dom";
import {connect, useSelector, useDispatch} from 'react-redux';

//import styles specific to component
import "./HomePage.scss";

//import any child components to be rendered
import Header from '../../components/Header/Header';
import NextVideoSection from "../../components/NextVideoSection/NextVideoSection";
import VideoDetails from "../../components/VideoDetails/VideoDetails"
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import CommentsSection from '../../components/CommentsSection/CommentsSection';

import {getSideVideos} from '../../actions/sideVideo';
import {updateMainVideo} from '../../actions/mainVideo';
import {getUser} from '../../actions/user';

const HomePage = ({match}) => {

    const dispatch = useDispatch();
    const mainVideo = useSelector(state=>state.mainVideoStore.mainVideo);
    const mainError = useSelector(state=>state.mainVideoStore.error);
    const sideError = useSelector(state=>state.sideVideoStore.error);

    useEffect(()=>{
        dispatch(getSideVideos(match.params.id));
        dispatch(getUser(match.params.username));
    },[]);

    useEffect(()=>{
        if(sessionStorage.getItem("homeVideo")){
            const videoId = (match.path !== "/home/:username" && match.path !== "/notfound") ? match.params.id : JSON.parse(sessionStorage.getItem("homeVideo")).id;
            (mainVideo !== videoId  && match.path !== "/notfound") && dispatch(updateMainVideo(videoId));
        }
    },[match.params.id]);

     /** ==================================  Component Rendering =================================================*/
    return (
        <>
        <Header match={match}/>
        {/* if an error code exists then redirect to the error page */}
            {(sideError || mainError) && <Redirect to="/notfound"/>}
            <main className="main">
               <VideoPlayer/>
                <div className = "main__lower">
                    <div className = "main__column-left">
                        <VideoDetails/>
                        {/* render the CommentSection component using the array stored in the comments key as long as the array is defined*/}
                        {mainVideo.comments && <CommentsSection/>}          
                    </div>

                    <div className = "main__column-right">
                        <NextVideoSection />
                    </div>
                </div>
            </main>
        </>
    )
}

export default connect(null,null)(HomePage);