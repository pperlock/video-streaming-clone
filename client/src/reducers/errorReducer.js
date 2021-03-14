const initialState = {
    error:null
};

const errorReducer = (state = initialState, action) =>{
    switch(action.type){
        case 'UPDATE_ERROR':
            return{
                error:action.payload
            };    
        default:
            return state; 
    }
}


export default errorReducer;