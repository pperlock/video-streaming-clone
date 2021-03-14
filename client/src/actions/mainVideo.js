import {UPDATE_MAIN_STARTED, UPDATE_MAIN_SUCCESS, UPDATE_MAIN_FAILURE} from './types';

import axios from 'axios';

export const updateMainVideoSuccess = videoId => ({
    type:UPDATE_MAIN_SUCCESS,
    payload:videoId
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
        axios.get("http://localhost:8080/videos/" + videoId)
        .then(res=>{
            res.data !== "failed" ? dispatch(updateMainVideoSuccess(res.data)) : dispatch(updateMainVideoFailure("Video Not Found"));
        })
        .catch(err=>{
            dispatch(updateMainVideoFailure(err.message));
        })
    }
}
