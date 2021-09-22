const initState = {
    authError: null,
    loading: false
}

const AuthReducer = (state = initState, action) => {
    switch(action.type) {
        case 'LOGIN_ERROR' : 
            console.log(action.err.message)
            return {
                ...state, 
                authError: action.err.message
            }
        case 'LOGIN_SUCCESS' :
            console.log('LOGIN SUCCESS')
            return {
                ...state,
                authError: null
            }
        case 'SIGNOUT_SUCCESS' :
            console.log('sign out success'); 
            return {
                state
            }
        case 'SIGNUP_SUCCESS' :
            console.log('Sign up Success');
            return {
                ...state,
                authError: null
            }
        case 'SIGNUP_ERROR' :
            console.log(action.err.message);
            return {
                ...state,
                authError : action.err.message
            }
        case 'SET_LOADING' : 
            console.log('Loading Set');
            return {
                ...state,
                loading: action.loading
            }
        default: 
            return state
    }
}

export default AuthReducer;