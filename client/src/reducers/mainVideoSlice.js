import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

//define the initial sideVideos array
const initialState = {
    mainVideo:{},
    status:'pending',
    error:null
};

export const getMainVideo = createAsyncThunk('videos/getMainVideo', (payload, {dispatch})=>{
    console.log(payload);
    return axios.get("http://localhost:8080/videos/" + payload);
});

const mainVideoSlice = createSlice({
    name:'mainVideo',
    initialState,
    reducers:{},
    extraReducers:{
        [getMainVideo.pending]: (state, action) =>{
            state.status = 'loading'
        },
        [getMainVideo.fulfilled]: (state, action) => {
            state.status = "succeeded"
            state.MainVideos = action.payload.data;
        },
        [getMainVideo.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        }
    }
});

//export the MainVideos reducer function that createSlice generates

export default mainVideoSlice.reducer