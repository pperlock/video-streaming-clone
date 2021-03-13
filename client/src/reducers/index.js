import sideReducer from './sideReducer';
import mainReducer from './mainReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    //counterReducer //Means --> counter: counterReducer,
    sideReducer,
    mainReducer
})

export default rootReducer;