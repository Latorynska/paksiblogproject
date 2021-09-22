const initState = {
    loading: false,
    err: null,
    status: null,
}

const PagingReducer = (state = initState, action) => {
    switch(action.type) {
        case 'SET_CONTENT' : 
            return {
                ...state,
                content: action.conten
            }
        case 'ADD_CONTENT' :
            return {
                ...state,
                status: action.status
            }
        case 'SET_ERROR' : 
            return {
                ...state,
                err: action.err.message
            }
        default: 
            return state
    }
}

export default PagingReducer;