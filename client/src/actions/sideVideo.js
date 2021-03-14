import {GET_VIDEOS_STARTED, GET_VIDEOS_SUCCESS, GET_VIDEOS_FAILURE} from './types';

import axios from 'axios';

import {updateMainVideo} from './mainVideo';

export const getSideVideosSuccess = videos => ({
    type:GET_VIDEOS_SUCCESS,
    payload:videos
});

export const getSideVideosStarted = () => ({
    type:GET_VIDEOS_STARTED,
});

export const getSideVideosFailure = error => ({
    type:GET_VIDEOS_FAILURE,
    payload:error
});

export const getSideVideos = (videoId)=> {
    return (dispatch, getState) =>{
        dispatch(getSideVideosStarted());
        axios.get("http://localhost:8080/videos/")
        .then(res=>{
            sessionStorage.setItem("homeVideo", JSON.stringify(res.data[0]));
            dispatch(getSideVideosSuccess(res.data));
            videoId  ? dispatch(updateMainVideo(videoId)) : dispatch(updateMainVideo(res.data[0].id));
        })
        .catch(err=>{
            dispatch(getSideVideosFailure(err.message));
        })
    }
}