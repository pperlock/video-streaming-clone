import {createSlice,createAsyncThunk, isRejectedWithValue} from '@reduxjs/toolkit';
import axios from 'axios';

//define the initial sideVideos array
const initialState = {
    sideVideos:[],
    status:'pending',
    error:null
};

//createAsyncThunk => 2 arguments:
//a string that will be used as the prefix for the generated action types
//a payload creator callback function that should return a promise containing some data, or a rejected promise with an error
//if we try calling dispatch(getSideVideos()), the getSideVideos thunk will first dispatch an action type of '/videos/getSideVideos/pending'
//we can listen for this action in our reducer and mark the request status as 'loading'
//once the promise resolves, the getSideVideos thunk takes the res.data array from the callback and dispatches a '/videos/getSideVideos/fulfilled' action containing the posts array as action.payload

// export const getSideVideos = createAsyncThunk('videos/getSideVideos', (payload, {dispatch})=>{
//     return axios.get("http://localhost:8080/videos/")
//         .then(res=>{
//             //this.setState({sideVideos:res.data}, ()=>this.updateMainVideo(res.data[0].id));
//             console.log(res.data);
//             return res.data;
            
//         })
//         .catch(err=>{
//             console.log('reached');
//             //this.setState({error:err})
//         })
//     }
// )
export const getSideVideos = createAsyncThunk('videos/getSideVideos', (payload, {dispatch})=>{
    return axios.get("http://localhost:8080/videos/");
});

const sideVideosSlice = createSlice({
    name:'sideVideos',
    initialState,
    reducers:{},
    extraReducers:{
        [getSideVideos.pending]: (state, action) =>{
            state.status = 'loading'
        },
        [getSideVideos.fulfilled]: (state, action) => {
            state.status = "succeeded"
            state.sideVideos = state.sideVideos.concat(action.payload.data)
        },
        [getSideVideos.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        }
    }
});

//export the sideVideos reducer function that createSlice generates

export default sideVideosSlice.reducer