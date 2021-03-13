import {configureStore} from '@reduxjs/toolkit';

import {createStore, applyMiddleware} from 'redux';
// import {composeWithDevTools} from 'redux-devtools-extension';

import thunk from 'redux-thunk';

import rootReducer from './reducers';

import sideReducer from './reducers/sideReducer';

//every time we create a new slice we need to add its reducer to our redux store
//this tells our top-level state object to have a field named sideVideos inside and all the data for state.sideVideos will be updated by the sideVideos.reducer function when actions are dispatched
configureStore({
    reducer:{sideVideos:sideReducer}
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store