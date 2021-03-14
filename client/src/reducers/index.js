import sideReducer from './sideReducer';
import mainReducer from './mainReducer';
import errorReducer from './errorReducer';
import userReducer from './userReducer';
import {combineReducers} from 'redux';

const allReducers =  combineReducers({
    //counterReducer //Means --> counter: counterReducer,
    sideVideoStore:sideReducer,
    mainVideoStore:mainReducer,
    errorStore:errorReducer,
    userStore:userReducer
})

export default allReducers;