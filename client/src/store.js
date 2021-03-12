import {configureStore} from '@reduxjs/toolkit';   

import sideVideosReducer from './reducers/sideVideosSlice';

//every time we create a new slice we need to add its reducer to our redux store
//this tells our top-level state object to have a field named sideVideos inside and all the data for state.sideVideos will be updated by the sideVideos.reducer function when actions are dispatched
export default configureStore({
    reducer:{sideVideos:sideVideosReducer}
});