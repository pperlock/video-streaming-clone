const initialState = {
    mainVideo:{},
    error:null
};

const mainReducer = (state = initialState, action) =>{
    switch(action.type){
        case 'UPDATE_MAIN_STARTED':
            return {...state};
        case 'UPDATE_MAIN_SUCCESS':
            return{
                ...state,
                error:null,
                mainVideo: action.payload
            };
        case 'UPDATE_MAIN_FAILURE':
            return{
                ...state,
                error:action.payload.error
            };    
        default:
            return state; 
    }
}

export default mainReducer;