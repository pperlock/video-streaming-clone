import {GET_VIDEOS_STARTED, GET_VIDEOS_SUCCESS, GET_VIDEOS_FAILURE, UPDATE_MAIN_STARTED, UPDATE_MAIN_SUCCESS, UPDATE_MAIN_FAILURE} from './types';

import axios from 'axios';

export const getSideVideosSuccess = videos => ({
    type:GET_VIDEOS_SUCCESS,
    payload:videos
});

export const getSideVideosStarted = () => ({
    type:GET_VIDEOS_STARTED,
});

export const getSideVideosFailure = error => ({
    type:GET_VIDEOS_FAILURE,
    payload:{error}
});

export const getSideVideos = ()=> {
    console.log('SIDE MIDDLEWARE STARTED');
    return (dispatch, getState) =>{
        dispatch(getSideVideosStarted());
        console.log(getState());
        axios.get("http://localhost:8080/videos/")
        .then(res=>{
            dispatch(getSideVideosSuccess(res.data));
            dispatch(updateMainVideo(res.data[0].id));
        })
        .catch(err=>{
            dispatch(getSideVideosFailure(err.message));
        })
    }
}

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




// export const addComment = (videoId) => ({
//     type:ADD_COMMENT,
//     payload:videoId
// });

// export const deleteComment = (videoId) => ({
//     type:DELETE_COMMENT,
//     payload:videoId
// });