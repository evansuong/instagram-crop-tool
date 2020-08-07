

const EditorReducer = (state, action) => {
    // FITTING VS FILL
    // GRID DIMENSIONS
    switch (action.type) {
        case 'TOGGLE_FIT':
            // Object.assign({}, { ...state, fitting: !state.fitting }) works too
            return Object.assign({}, state, { 
                fitting: !state.fitting
            });

        case 'SET_GRID_COLS':
            return Object.assign({}, state, {
                grid: { 
                    ...state.grid, 
                    cols: action.payload 
                } 
            })
            
        case 'SET_GRID_ROWS':
            return Object.assign({}, state, {
                grid: { 
                    ...state.grid, 
                    rows: action.payload 
                } 
            });

        case 'SET_GRID_DIMS':
            return Object.assign({}, state, {
                gridDims: { 
                    ...action.payload
                } 
            });

        case 'SET_IMAGE_DIMS':
            return Object.assign({}, state, {
                imageDims: { 
                    ...action.payload
                } 
            });

        case 'IMAGE_LOADED':
            return Object.assign({}, state, {
                imageLoaded: true
            });

        case 'SNAP_GRID':
            state.snap(action.payload);
            return state;

        case 'SET_BG_COLOR':
            console.log('setting image background color')
            return Object.assign({}, state, {
                bgColor: action.payload
            });


        default: 
            return state;
        
    }
}

export default EditorReducer;