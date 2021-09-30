const initState = {
    loading: false,
    err: null,
    status: false
}

const ContentReducer = (state = initState, action) => {
    switch(action.type) {
        case 'SET_CONTENT' : 
            return {
                ...state,
                content: action.content
            }
        case 'ADD_CONTENT' :
            console.log("berhasil upload data!");
            return {
                ...state,
                status: action.status
            }
        case 'UPDATE_CONTENT' : 
            console.log("Update ", action.status);
            return {
                ...state,
                status: action.status
            }
        case 'SET_ERROR' : 
            return {
                ...state,
                status: false,
                err: action.err
            }
        case 'SET_LOADING' : 
            return {
                ...state,
                loading: action.loading
            }
        default: 
            return state
    }
}

export default ContentReducer;