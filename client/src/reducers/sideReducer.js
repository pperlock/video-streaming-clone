import axios from 'axios';

import {setVideos} from '../actions';

const sideReducer = (state = 0, action) =>{
    switch(action.type){
        case "SET_VIDEOS":
            return {...state, sideVideos: action.payload}
        default:
            return state; 
    }
}

export const loadSideVideos = ()=> (dispatch, getState)=>{
    const videos = axios.get("http://localhost:8080/videos/");
    console.log(videos);
    dispatch(setVideos(videos));
}
 
export default sideReducer;