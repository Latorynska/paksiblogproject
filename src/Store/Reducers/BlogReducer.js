const initState = {
    loading: false,
    err: null,
    banner: null,
}

const BlogReducer = (state = initState, action) => {
    switch(action.type) {
        case 'SET_BANNER' : 
            return {
                ...state,
                banner: action.banner
            }
        case 'SET_ERROR' : 
            return {
                ...state,
                err: action.err
            }
        default: 
            return state
    }
}

export default BlogReducer;