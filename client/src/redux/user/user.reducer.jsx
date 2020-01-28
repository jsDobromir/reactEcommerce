import UserActionTypes from './user.types';
const INITIAL_STATE = {
    currentUser : null,
    errorMessage : null,
}


const userReducer = (state = INITIAL_STATE,action) => {
    switch(action.type){
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser : action.payload
            }

        case UserActionTypes.SIGN_IN_SUCCESS:
        case UserActionTypes.SIGN_UP_SUCCESS:
            return {
                ...state,
                currentUser : action.payload,
                errorMessage : null
            }
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser : null,
                errorMessage : null
            }
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILUER:
        case UserActionTypes.SIGN_UP_FAILURE:
            return {
                ...state,
                errorMessage : action.payload
            }
        
        default:
            return state;
    }
}

export default userReducer;