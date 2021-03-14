import {GET_USER_STARTED, GET_USER_SUCCESS, GET_USER_FAILURE, USER_LOGOUT} from './types';

import axios from 'axios';

export const getUserSuccess = user => ({
    type:GET_USER_SUCCESS,
    payload:{
        user,
        loggedIn:true
    }
});

export const getUserStarted = () => ({
    type:GET_USER_STARTED,
});

export const getUserFailure = error => ({
    type:GET_USER_FAILURE,
    payload:{
        error,
        loggedIn:false
    }
});

export const userLogout = ()=>({
    type: USER_LOGOUT
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