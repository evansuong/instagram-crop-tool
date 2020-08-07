
const PageReducer = (state, action) => {
    switch (action.type) {
        case 'NEXT_PAGE':
            console.log("next page")
            console.log(state + 1)
            return state + 1;
        case 'PREVIOUS_PAGE':
            console.log("last page");
            console.log(state - 1)
            return state - 1;
        default:
            return state;
    }
}

export default PageReducer;