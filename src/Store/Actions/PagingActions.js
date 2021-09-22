export const Set_Page = (page) => {
    return (dispatch) => {
        console.log(page);
        dispatch({
            type: 'SET_PAGE',
            page: page
        });
    }
}