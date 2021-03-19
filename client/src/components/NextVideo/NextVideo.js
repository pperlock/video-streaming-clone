import React from "react";
import {Link} from 'react-router-dom';
import {connect, useSelector} from 'react-redux';

//import styles specific to component
import "./NextVideo.scss";

/**
* NEXT VIDEO COMPONENT
* Useage: Renders the details of a video object
* @param {object} video
*/

function NextVideo ({video}){

        const username = useSelector(state=>state.userStore.user.username);

        // deconstruct the video object for code readability
        const {id,image,title,channel} = video;

        return(
        <div className = "next-video">
            {/* direct the user to the video page associated with the video id of the image */}
            <Link className="next-video__link" to={`/home/${username}/video/${id}`}>
                {/* set the background image of the image thumbnail div - used background images because the appearance better represented mockup than img tag*/}
                <div onClick= {()=>{window.scrollTo(0,0)}} id ={video.id} key={id} className = "next-video__thumb" style={{backgroundImage: `url(${image})`}}></div>
            </Link>
            
            <div className = "next-video__details">
                <p className = "next-video__details-title"> {title}</p>
                <p className = "next-video__details-owner">{channel}</p>
            </div>
        </div>
    );
};

export default connect(null,null)(NextVideo);