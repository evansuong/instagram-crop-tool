const ThemeReducer = (state, action) => {
    switch (action.type) {
        case 'TOGGLE_THEME': 
            if(state === 'light') return 'dark' 
            else return 'light'
        default: return state;
    }
}

export default ThemeReducer;