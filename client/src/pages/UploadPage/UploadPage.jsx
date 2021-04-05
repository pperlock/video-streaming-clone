// import all modules need for functionality
import React, {useEffect, useState} from 'react';
import {Redirect, Link, useHistory} from "react-router-dom";
import {connect, useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import firebase from '../../firebase';

//import styles specific to component
import "./UploadPage.scss";

import Header from '../../components/Header/Header';
import {getUser} from '../../actions/user';
import {updateMainVideo} from '../../actions/mainVideo';

const API_URL = process.env.NODE_ENV === "production" ? 'https://video-streaming-clone.herokuapp.com': 'http://localhost:5000';

function UploadPage({match}) {

    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state=>state.userStore.user);

    useEffect(()=>{
        dispatch(getUser(match.params.username));
    },[]);

    // const [thumbURL, setThumbURL] = useState("/assets/icons/image.svg");
    const [thumbURL, setThumbURL] = useState();
    const [videoURL, setVideoURL] = useState();
    const [showLoadingThumb, setShowLoadingThumb] = useState(false);
    const [showLoadingVideo, setShowLoadingVideo] = useState(false);


    /**
     * Function: addVideo
     * Useage: posts a new video to the server
     * @param {synthetic react event} event
    */
    const addVideo = (event) =>{
        event.preventDefault();
        axios.post(`${API_URL}/videos/`,
            {
                "title": event.target.uploadTitle.value,
                "channel": user.name,
                "avatar": user.avatar,
                "userId": user.id,
                "image":thumbURL,
                "description": event.target.uploadDescription.value,
                "views": "0",
                "likes":"0",
                "duration": "4:00",
                "video":videoURL,
            })
        .then(res=>{
            let path = `/home/${user.username}/video/${res.data.id}`; 
            history.push(path); 
        })
        .catch(err=>{
            <Redirect to={{pathname:"/notfound", state:{error:err}}}/>
        });
    }


    const onDrop = (event,type) =>{
        //prevents the file from being opened
        console.log(event.dataTransfer.files);
        event.preventDefault();

       // Use DataTransferItemList interface to access the file(s)
        for (var i = 0; i < event.dataTransfer.items.length; i++) {
              // If dropped items aren't files, reject them
            if (event.dataTransfer.items[i].kind === 'file') {
                var file = event.dataTransfer.items[i].getAsFile();
            }
        
            let bucketName = "video-posters";
            let storageRef = firebase.storage().ref(`/${bucketName}/${file.name}`);
            let uploadTask = storageRef.put(file);
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                //next
                ()=>{
                    console.log("Uploading ...")
                    //show the loading icon while resource is uploading
                    type === "thumb" ? setShowLoadingThumb(true) : setShowLoadingVideo(true);
                },
                //error
                ()=>{
                    console.log("Upload Unsuccessful");
                },
                //complete
                ()=>{
                    let storageLoc = firebase.storage().ref();
                    storageLoc.child(`/${bucketName}/${file.name}`).getDownloadURL()
                    .then((url)=>{
                        type === "thumb" ? setThumbURL(url) : setVideoURL(url);
                        //stop showing the loading icon
                        type === "thumb" ? setShowLoadingThumb(false) : setShowLoadingVideo(false);
                    })
                    .catch(err=>{
                        console.log(err);
                    })
                }   
            )
        }
    }

    const onDragEnter = event =>{
        event.stopPropagation();
    }
    
    const onDragOver = event =>{
        event.stopPropagation();
        event.preventDefault();  
    }

    return (
        <>
        <Header match={match}/>
        <main className="upload">
            <h1 className="upload__title">Upload Video</h1>            
            <form className="upload__form" id="upload__form" onSubmit={(event)=>addVideo(event)}>
                <div className="upload__upper">
                    <div className="upload__files">
                        <div id="drop-thumb" onDrop={(event)=>onDrop(event,"thumb")} onDragEnter={onDragEnter} onDragOver={onDragOver} className="upload__thumb-wrapper"
                            style={{backgroundImage: `url(${thumbURL})`}}>
                            {(!thumbURL && !showLoadingThumb) && <p className="upload__text">DROP VIDEO THUMBNAIL HERE</p>}
                            {showLoadingThumb && <img className="upload__loading" src="/assets/icons/loading-icon.gif" alt="loading icon"/>}
                        </div>
                        <div id="drop-video" onDrop={(event)=>onDrop(event,"video")} onDragEnter={onDragEnter} onDragOver={onDragOver} className="upload__thumb-wrapper"
                            style={videoURL ? {backgroundImage: `url(${thumbURL})`} : {backgroundImage: `url("")`}}>
                            {(!videoURL && !showLoadingVideo) && <p className="upload__text">DROP VIDEO FILE HERE</p>}
                            {(videoURL && !showLoadingVideo) && <p className="upload__text">VIDEO LOADED</p>}
                            {showLoadingVideo && <img className="upload__loading" src="/assets/icons/loading-icon.gif" alt="loading icon"/>}
                        </div>
                    </div>
                    <div className="upload__inputs">
                        <label className="upload__label" htmlFor="uploadTitle">TITLE YOUR VIDEO</label>
                        <input className="upload__video-title" name="uploadTitle" type="text" placeholder="Add a title to your video" required/>
                        <label className="upload__label" htmlFor="uploadDescription">ADD A VIDEO DESCRIPTION</label>
                        <textarea className="upload__video-description" form="upload__form" wrap="hard" name="uploadDescription" id="uploadDescription" placeholder="Add a description of your video" rows="3" cols="20" required></textarea>
                    </div>
                </div>
                <div className="upload__lower">
                    <button className="upload__publish" type="submit">PUBLISH</button>
                    <Link to="/" className="upload__cancel">CANCEL</Link>
                </div>
            </form>
        </main>
        </>
    )
}

export default connect(null)(UploadPage);
