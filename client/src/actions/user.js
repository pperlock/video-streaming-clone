import {GET_USER_STARTED, GET_USER_SUCCESS, GET_USER_FAILURE} from './types';

import axios from 'axios';

export const getUserSuccess = video => ({
    type:GET_USER_SUCCESS,
    payload:video
});

export const getUserStarted = () => ({
    type:GET_USER_STARTED,
});

export const getUserFailure = error => ({
    type:GET_USER_FAILURE,
    payload:{error}
});

export const getUser = (username)=> {
    return (dispatch, getState) =>{
        dispatch(getUserStarted());
        axios.get("http://localhost:8080/user/" + username)
        .then(res=>{
            res.data !== "failed" ? dispatch(getUserSuccess(res.data)) : dispatch(getUserFailure("User Not Found"));
        })
        .catch(err=>{
            dispatch(getUserFailure(err.message));
        })
    }
}