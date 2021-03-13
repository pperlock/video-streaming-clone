const initialState = {
    sideVideos:[],
    error:null
};

const sideReducer = (state = initialState, action) =>{
    console.log('reducer started');
    switch(action.type){
        case 'GET_VIDEOS_STARTED':
            console.log('GET_VIDEOS_STARTED');
            return {...state};
        case 'GET_VIDEOS_SUCCESS':
            console.log('GET_VIDEOS_SUCCESS');
            return{
                ...state,
                error:null,
                sideVideos:action.payload
            };
        case 'GET_VIDEOS_FAILURE':
            return{
                ...state,
                error:action.payload.error
            };    
        default:
            return state; 
    }
}


export default sideReducer;