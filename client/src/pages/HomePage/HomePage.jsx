// import all modules need for functionality
import React, {useEffect, useState} from 'react';
import {Redirect} from "react-router-dom";
import axios from 'axios';

//import styles specific to component
import "./HomePage.scss";

//import any child components to be rendered
import NextVideoSection from "../../components/NextVideoSection/NextVideoSection";
import VideoDetails from "../../components/VideoDetails/VideoDetails"
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import CommentsSection from '../../components/CommentsSection/CommentsSection';

// import {loadSideVideos} from "../../reducers/sideReducer";
// import {useSelector, useDispatch} from 'react-redux';

const HomePage = ({match, location}) => {

    //url for the axios calls
    const apiUrl = "http://localhost:8080/videos/";
    
    const [sideVideos, setSideVideos] = useState([{id:""}]);
    const [mainVideo, setMainVideo] = useState({id:""});
    const [initial, setInitial] = useState(0);
    const [error, setError] = useState("");
    
    useEffect(()=>{
        // console.log("useEffect 1 reached");
        getSideVideos();
    },[]);

    useEffect(()=>{
        // console.log("useEffect Reached", match.params.id);
        // console.log('useffect mainVideo', mainVideo.id)
        const videoId = (match.path !== "/" && match.path !== "/notfound") ? match.params.id : JSON.parse(sessionStorage.getItem("homeVideo")).id;
        (mainVideo !== videoId  && match.path !== "/notfound") && updateMainVideo(videoId);
    },[match.params.id]);

    /** ==================================  Function Declarations =================================================*/
    
    /**
     * Function: getSideVideos
     * Useage: Retrieves the sideVideo data from the api
     */
    
    const getSideVideos = () =>{
        axios.get(apiUrl)
        .then(res=>{
            setSideVideos(res.data);
            match.params.id ? updateMainVideo(match.params.id) : updateMainVideo(res.data[0].id);
        })
        .catch(err=>{
            setError(err);
        })
    }

    /**
     * Function: updateMainVideo
     * Useage: Retrieves mainVideo data from the api associated with a specific video id and updates the state
     * @param {string} currentId 
     */
    const updateMainVideo = (currentId) => {
        // console.log("update current id", currentId);
        axios.get(apiUrl + currentId)
            .then(res=>{
                //if this is the first time the page has been loaded this session and it's the home route then set the first video in the list in the sessionStorage
                //this handles any linking back from the upload page from being set as the new home video
                if(initial===0 && match.path=="/"){
                    sessionStorage.setItem("homeVideo", JSON.stringify(res.data))
                    // Once updateVideo has been called, the page has been visited once so update initial to > 0
                    setInitial(1);
                } 
                if(res.data !== "failed"){  
                // Update the video to be shown on the video player
                    setMainVideo(res.data);
                }else{
                    setError("Video Not Found");
                }
            })
            .catch(err=>{
                console.log(err);
                setError(err)
            }
            )
        };

    /**
     * Function: addComment
     * Useage: Takes in the data from the commentForm input box, posts it to the api and then updates the main video object in state
     * @param {event from button click on CommentForm component} event 
     */    

    const addComment = (event) => {
        event.preventDefault();

        axios.post(apiUrl + mainVideo.id + "/comments",
        {
            "name":'Patti Perlock',
            "comment":event.target.message.value
        })
        .then(res=>{
            updateMainVideo(mainVideo.id);
        })
        .catch(err=>
            setError(err)
        );

        event.target.message.value="";
    };

    /**
     * Function: deleteComment
     * Useage: Takes in the id associate with the comment to be deleted, removes it from the api and updates the main video object in state
     * @param {string} commentId 
     */

    const deleteComment = (commentId)=> {
        axios.delete(apiUrl + mainVideo.id + "/comments/" + commentId)
        .then(res=>{
            updateMainVideo(mainVideo.id);
        })
        .catch(err=>
            setError(err)
        );
    }

    /**
     * Function: updateVideoLikes
     * Useage: updates the number of likes for the video that is currently rendered onscreen
      */

    const updateVideoLikes = () =>{
        axios.put(apiUrl + mainVideo.id + "/likes/")
            .then(res=>{
                updateMainVideo(mainVideo.id);
            })
            .catch(err=>
                setError(err)
            );
    }
     /** ==================================  Component Rendering =================================================*/
    return (
        <>
        {/* if an error code exists then redirect to the error page */}
        {error!=="" && <Redirect to={{pathname:"/notfound", state:{error:error}}}/>}
            <main className="main">
                {/* pass the necessary keys from the mainVideo object to render the VideoPlayer component */}
                <VideoPlayer mainVideo={mainVideo}/>
                <div className = "main__lower">
                    <div className = "main__column-left">
                        {/* render the VideoDetails component using the currentVideo object */}
                        <VideoDetails mainVideo={mainVideo} addComment={addComment} deleteComment={deleteComment} updateVideoLikes={updateVideoLikes}/>
                        {/* render the CommentSection component using the array stored in the comments key as long as the array is defined*/}
                        {mainVideo.comments && <CommentsSection comments = {mainVideo.comments} addComment={addComment} deleteComment={deleteComment}/>}          
                    </div>
                    <div className = "main__column-right">
                        {/* render the nextVideo section using the array sideVideo objects with the current video being played filtered from the list*/}
                        <NextVideoSection sideVideos = {sideVideos.filter(video=>video.id!==mainVideo.id)}/>
                    </div>
                </div>
            </main>
        </>
    )
}

export default HomePage
