import {LOGIN_STARTED, LOGIN_SUCCESS, LOGIN_FAILURE} from './types';

import axios from 'axios';

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
        axios.get("http://localhost:8080/user/" + username)
        .then(res=>{
            res.data !== "failed" ? dispatch(loginSuccess(res.data)) : dispatch(loginFailure("User Not Found"));
        })
        .catch(err=>{
            dispatch(loginFailure(err.message));
        })
    }
}