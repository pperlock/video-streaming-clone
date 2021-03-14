const initialState = {
    user:{},
    error:null
};

const userReducer = (state = initialState, action) =>{
    switch(action.type){
        case 'GET_USER_STARTED':
            return {...state};
        case 'GET_USER_SUCCESS':
            return{
                ...state,
                error:null,
                user: action.payload
            };
        case 'GET_USER_FAILURE':
            return{
                ...state,
                error:action.payload.error
            };    
        default:
            return state; 
    }
}

export default userReducer;