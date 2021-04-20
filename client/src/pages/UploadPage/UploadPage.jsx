// import all modules need for functionality
import React, {useEffect, useState, useRef} from 'react';
import {Link, useHistory} from "react-router-dom";
import {connect, useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import firebase from '../../firebase';

//import styles specific to component
import "./UploadPage.scss";

import Header from '../../components/Header/Header';
import {getUser} from '../../actions/user';

const API_URL = process.env.NODE_ENV === "production" ? 'https://video-streaming-clone.herokuapp.com': 'http://localhost:5000';

function UploadPage({match}) {

    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state=>state.userStore.user);

    //refs for the hidden file input boxes
    const thumbInput = useRef(null);
    const videoInput = useRef(null);

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
        axios.post(`${API_URL}/api/videos/`,
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
        .catch(err =>
            console.log(err)
        );
    }

    const uploadToFirebase = (selectedFile, type) => {
        console.log(selectedFile);
        // Use DataTransferItemList interface to access the file(s)
          let bucketName = "video-posters";
          let storageRef = firebase.storage().ref(`/${bucketName}/${selectedFile.name}`);
          let uploadTask = storageRef.put(selectedFile);
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
                  storageLoc.child(`/${bucketName}/${selectedFile.name}`).getDownloadURL()
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

    const fileSelectedHandler = (event, type) => {
        event.preventDefault();
        uploadToFirebase(event.target.files[0], type);
    }

    const onDrop = (event,type) => {
        //prevents the file from being opened
        console.log(event.dataTransfer.files);
        event.preventDefault();

        for (var i = 0; i < event.dataTransfer.items.length; i++) {
            // If dropped items aren't files, reject them
          if (event.dataTransfer.items[i].kind === 'file') {
            //   setSelectedFile(event.dataTransfer.items[i].getAsFile());
             uploadToFirebase(event.dataTransfer.items[i].getAsFile(), type);
          }
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
                        <div id="drop-thumb" 
                            onDrop={(event)=>onDrop(event,"thumb")} 
                            onDragEnter={onDragEnter} 
                            onDragOver={onDragOver} 
                            className="upload__thumb-wrapper"
                            style={{backgroundImage: `url(${thumbURL})`}}>
                            {(!thumbURL && !showLoadingThumb) &&
                                <div className = "upload__file-wrapper">
                                    <input type="file" style={{display:'none'}}  ref={thumbInput} onChange={event => fileSelectedHandler(event,"thumb")}></input>
                                    {/* activate the hidden file input through the ref */}
                                    <button className="upload__file-button" type="button" onClick = {()=> thumbInput.current.click()}>Select Thumbnail File</button>
                                    <p className="upload__file-text"> OR DROP FILE HERE</p>
                                </div>
                            }
                            {showLoadingThumb && <img className="upload__loading" src="/assets/icons/loading-icon.gif" alt="loading icon"/>}
                            {(thumbURL && !showLoadingThumb) && <p className="upload__file-success">SUCCESS</p>}
                        </div>
                        <div id="drop-video" 
                            onDrop={(event)=>onDrop(event,"video")} 
                            onDragEnter={onDragEnter} 
                            onDragOver={onDragOver} 
                            className="upload__thumb-wrapper"
                            style={videoURL ? {backgroundImage: `url(${thumbURL})`} : {backgroundImage: `url("")`}}>
                            {(!videoURL && !showLoadingVideo) && 
                                <div className = "upload__file-wrapper">
                                    <input type="file" style={{display:'none'}} ref={videoInput} onChange={event => fileSelectedHandler(event,"video")}></input>
                                    {/* activate the hidden file input through the ref */}
                                    <button className="upload__file-button" type="button" onClick = {()=> videoInput.current.click()}>Select Video File</button>
                                    <p className="upload__file-text"> OR DROP FILE HERE</p>
                                </div>
                            }
                            {showLoadingVideo && <img className="upload__loading" src="/assets/icons/loading-icon.gif" alt="loading icon"/>}
                            {(videoURL && !showLoadingVideo) && <p className="upload__file-success">SUCCESS</p>}
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
