const initialState = {
    user:{},
    error:null,
    loggedIn:false
};

const userReducer = (state = initialState, action) =>{
    switch(action.type){
        case 'GET_USER_STARTED':
            return {...state};
        case 'GET_USER_SUCCESS':
            return{
                ...state,
                error:null,
                user: action.payload.user,
                loggedIn:action.payload.loggedIn
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