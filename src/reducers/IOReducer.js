
// export array of cell images
const IOReducer = (state, action) => {
    switch (action.type) {
        case 'EXPORT_IMG': 
            return Object.assign({}, state, {
                initExport: false,
                exportPackage: action.payload
            });

        case 'INIT_EXPORT': 
            return Object.assign({}, state, {
                initExport: true
            });

        case 'IMPORT_IMG': 
            return Object.assign({}, state, {
                importPackage: action.payload
            });
        
        default: return state;
    }
}

export default IOReducer;