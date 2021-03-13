// import all modules need for functionality
import React, {useEffect} from 'react';
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

class HomePage extends React.Component {

    //url for the axios calls
    apiUrl = "http://localhost:8080/videos/";
    
    state={sideVideos:[{id:""}], mainVideo:{}, initial:0, error: ""};

    /** ==================================  Component Lifecycle Methods =================================================*/

    componentDidMount(){
        //get the sidevideo data and the main video object associated with the first video in the list when the page is loaded
        this.getSideVideos();
        // const dispatch = useDispatch();
        // dispatch(loadSideVideos);
        
  };

     componentDidUpdate(){
        
        if(this.state.initial !== 0){
            if(this.props.match.path !=="/"){
                //Reached if this is not the first load for the session and it is not the home path
                
                if(this.state.mainVideo.id !== this.props.match.params.id){ 
                    //Update the main video with the id from the url path if it does not match the id of the main video currently in state
                    this.updateMainVideo(this.props.match.params.id);            
                }    
            }else{
                //Reached if the this is not the first load for the session and it is the home path
                
                //get the default video object from sessionStorage for the home page  
                const homeVideo=JSON.parse(sessionStorage.getItem("homeVideo"));
                
                if(this.state.mainVideo.id !== homeVideo.id){
                    //if the video currently in state doesn't match the default for the home page then update it to the default
                    this.updateMainVideo(homeVideo.id);
                }
            }
        }
        
    }

    /** ==================================  Function Declarations =================================================*/
    
    /**
     * Function: getSideVideos
     * Useage: Retrieves the sideVideo data from the api
     */
    
    getSideVideos = () =>{
        axios.get(this.apiUrl)
        .then(res=>{
            this.setState({sideVideos:res.data}, ()=>this.updateMainVideo(res.data[0].id));
        })
        .catch(err=>{
            this.setState({error:err})
        })
    }

    /**
     * Function: updateMainVideo
     * Useage: Retrieves mainVideo data from the api associated with a specific video id and updates the state
     * @param {string} currentId 
     */
    updateMainVideo = (currentId) => {
        axios.get(this.apiUrl + currentId)
            .then(res=>{
                //if this is the first time the page has been loaded this session then set the first video in the list in the sessionStorage
                if(this.state.initial===0){
                    sessionStorage.setItem("homeVideo", JSON.stringify(res.data))
                    // Once updateVideo has been called, the page has been visited once so update initial to > 0
                    this.setState({initial:1})
                }   
                // Update the video to be shown on the video player
                this.setState({mainVideo:res.data})
            })
            .catch(err=>
                this.setState({error:err})
            )
        };

    /**
     * Function: addComment
     * Useage: Takes in the data from the commentForm input box, posts it to the api and then updates the main video object in state
     * @param {event from button click on CommentForm component} event 
     */    

    addComment = (event) => {
        event.preventDefault();

        axios.post(this.apiUrl + this.state.mainVideo.id + "/comments",
        {
            "name":'Patti Perlock',
            "comment":event.target.message.value
        })
        .then(res=>{
            this.updateMainVideo(this.state.mainVideo.id);
        })
        .catch(err=>
            this.setState({error:err})
        );

        event.target.message.value="";
    };

    /**
     * Function: deleteComment
     * Useage: Takes in the id associate with the comment to be deleted, removes it from the api and updates the main video object in state
     * @param {string} commentId 
     */

    deleteComment = (commentId)=> {
        axios.delete(this.apiUrl + this.state.mainVideo.id + "/comments/" + commentId)
        .then(res=>{
            this.updateMainVideo(this.state.mainVideo.id);
        })
        .catch(err=>
            this.setState({error:err})
        );
    }

    /**
     * Function: updateVideoLikes
     * Useage: updates the number of likes for the video that is currently rendered onscreen
      */

    updateVideoLikes = () =>{
        axios.put(this.apiUrl + this.state.mainVideo.id + "/likes/")
            .then(res=>{
                this.updateMainVideo(this.state.mainVideo.id);
            })
            .catch(err=>
                this.setState({error:err})
            );
    }

    /** ==================================  Component Rendering =================================================*/

    render(){
        return (
            <>
            {/* if an error code exists then redirect to the error page */}
            {this.state.error!=="" && <Redirect to={{pathname:"/notfound", state:{error:this.state.error}}}/>}
                <main className="main">
                    {/* pass the necessary keys from the mainVideo object to render the VideoPlayer component */}
                    <VideoPlayer mainVideo={this.state.mainVideo}/>
                    <div className = "main__lower">
                        <div className = "main__column-left">
                            {/* render the VideoDetails component using the currentVideo object */}
                            <VideoDetails mainVideo={this.state.mainVideo} addComment={this.addComment} deleteComment={this.deleteComment} updateVideoLikes={this.updateVideoLikes}/>
                            {/* render the CommentSection component using the array stored in the comments key as long as the array is defined*/}
                            {this.state.mainVideo.comments && <CommentsSection comments = {this.state.mainVideo.comments} addComment={this.addComment} deleteComment={this.deleteComment}/>}          
                        </div>
                        <div className = "main__column-right">
                            {/* render the nextVideo section using the array sideVideo objects with the current video being played filtered from the list*/}
                            <NextVideoSection sideVideos = {this.state.sideVideos.filter(video=>video.id!==this.state.mainVideo.id)}/>
                        </div>
                    </div>
                </main>
            </>
        )
    }
}

export default HomePage
