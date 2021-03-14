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
    console.log('MAIN MIDDLEWARE STARTED');
    
    return (dispatch, getState) =>{
        dispatch(updateMainVideoStarted());
        console.log(getState());
        axios.get("http://localhost:8080/videos/" + videoId)
        .then(res=>{
            dispatch(updateMainVideoSuccess(res.data));
        })
        .catch(err=>{
            dispatch(updateMainVideoFailure(err.message));
        })
    }
}
