import {UPDATE_MAIN_STARTED, UPDATE_MAIN_SUCCESS, UPDATE_MAIN_FAILURE} from './types';

import axios from 'axios';

const API_URL = process.env.NODE_ENV === "production" ? 'https://video-streaming-clone.herokuapp.com': 'http://localhost:5000';

export const updateMainVideoSuccess = video => ({
    type:UPDATE_MAIN_SUCCESS,
    payload:video
});

export const updateMainVideoStarted = () => ({
    type:UPDATE_MAIN_STARTED,
});

export const updateMainVideoFailure = error => ({
    type:UPDATE_MAIN_FAILURE,
    payload:{error}
});

export const updateMainVideo = (videoId)=> {
    return (dispatch, getState) =>{
        dispatch(updateMainVideoStarted());
        axios.get(`${API_URL}/api/videos/${videoId}`)
        .then(res=>{
            res.data !== "failed" ? dispatch(updateMainVideoSuccess(res.data)) : dispatch(updateMainVideoFailure("Video Not Found"));
        })
        .catch(err=>{
            dispatch(updateMainVideoFailure(err.message));
        })
    }
}
