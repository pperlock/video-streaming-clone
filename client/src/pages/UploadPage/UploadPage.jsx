// import all modules need for functionality
import React from 'react';
import {Redirect, Link, useHistory} from "react-router-dom";
import axios from 'axios';

//import styles specific to component
import "./UploadPage.scss";

function UploadPage() {

    const history=useHistory();

    /**
     * Function: addVideo
     * Useage: posts a new video to the server
     * @param {synthetic react event} event
    */
    const addVideo = (event) =>{
        event.preventDefault();
        axios.post("http://localhost:8080/videos/",
            {
                "title": event.target.uploadTitle.value,
                "channel": "Patti Posts Stuff",
                "image":'/assets/images/Upload-video-preview.jpg',
                "description": event.target.uploadDescription.value,
                "views": "0",
                "likes":"0",
                "duration": "4:00",
                "video":"randomVideo.mp4",
            })
        .then(res=>{
            let path = `video/${res.data.id}`; 
            history.push(path); 
        })
        .catch(err=>{
            <Redirect to={{pathname:"/notfound", state:{error:err}}}/>
        });

        //reset the input boxes once uploaded
        event.target.uploadTitle.value = "";
        event.target.uploadDescription.value = "";
    }
      
    return (
        <main className="upload">
            <h1 className="upload__title">Upload Video</h1>            
            <form className="upload__form" id="upload__form" onSubmit={(event)=>addVideo(event)}>
                <div className="upload__upper">
                    <div className="upload__thumb-wrapper">
                        <p className="upload__label">VIDEO THUMBNAIL</p>
                        <img className="upload__thumb" src="/assets/images/Upload-video-preview.jpg" alt="bike"/>
                    </div>
                    <div className="upload__inputs">
                        <label className="upload__label" htmlFor="uploadTitle">TITLE YOUR VIDEO</label>
                        <input className="upload__video-title" name="uploadTitle" type="text" placeholder="Add a title to your video" required/>
                        <label className="upload__label" htmlFor="uploadDescription">ADD A VIDEO DESCRIPTION</label>
                        <textarea className="upload__video-description" form="upload__form" wrap="hard" name="uploadDescription" id="uploadDescription" placeholder="Add a description of your video" rows="2" cols="20" required></textarea>
                    </div>
                </div>
                <div className="upload__lower">
                    <button className="upload__publish" type="submit">PUBLISH</button>
                    <Link to="/" className="upload__cancel">CANCEL</Link>
                </div>
            </form>
        </main>
    )
}

export default UploadPage
