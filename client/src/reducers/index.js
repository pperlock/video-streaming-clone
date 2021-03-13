import sideReducer from './sideReducer';
import mainReducer from './mainReducer';
import {combineReducers} from 'redux';

const allReducers =  combineReducers({
    //counterReducer //Means --> counter: counterReducer,
    sideVideoStore:sideReducer,
    mainVideoStore:mainReducer
})

export default allReducers;