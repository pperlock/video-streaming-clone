import {LOGIN_STARTED, LOGIN_SUCCESS, LOGIN_FAILURE} from './types';

import axios from 'axios';

const API_URL = process.env.NODE_ENV === "production" ? 'https://video-streaming-clone.herokuapp.com': 'http://localhost:5000';

export const loginSuccess = user => ({
    type:LOGIN_SUCCESS,
    payload:user
});

export const loginStarted = () => ({
    type:LOGIN_STARTED,
});

export const loginFailure = error => ({
    type:LOGIN_FAILURE,
    payload:{error}
});

export const login = (username)=> {
    return (dispatch, getState) =>{
        dispatch(loginStarted());
        axios.get(`${API_URL}/user/${username}`)
        .then(res=>{
            res.data !== "failed" ? dispatch(loginSuccess(res.data)) : dispatch(loginFailure("User Not Found"));
        })
        .catch(err=>{
            dispatch(loginFailure(err.message));
        })
    }
}