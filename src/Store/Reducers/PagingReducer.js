const initState = {
    loading: false,
    page: 'dashboard'
}

const PagingReducer = (state = initState, action) => {
    switch(action.type) {
        case 'SET_PAGE' : 
            return {
                ...state,
                page: action.page
            }
        default: 
            return state
    }
}

export default PagingReducer;