import React, { createContext, useReducer } from 'react'
import EditorReducer from '../reducers/EditorReducer';

const snap = ({ imageDims, gridDims, fitting, editorDispatch }) => {
    
    let { width: imgWidth, height: imgHeight } = imageDims;
    let { gX, gY, gWidth, gHeight } = gridDims;
    
    let widthToHeight = (gHeight / imgHeight) * imgWidth;
    let heightToWidth = (gWidth / imgWidth) * imgHeight;

    // fit whole image inside of grid            
    if (fitting) {
        // fill grid height
        if (imgHeight > gHeight || imgHeight < gHeight) {
            imgHeight = gHeight;
            imgWidth = widthToHeight;
        }
        
        // shrink image if width overflows
        if (imgWidth > gWidth) {
            imgWidth = gWidth;
            imgHeight = heightToWidth;
        }
            
    // fill grid entirely with image
    } else {
        // fill grid height
        if (imgHeight > gHeight || imgHeight < gHeight) {
            imgHeight = gHeight;
            imgWidth = widthToHeight;
        } 
        
        // fill grid width
        if (imgWidth < gWidth) {
            imgWidth = gWidth;
            imgHeight = heightToWidth;
        }
    } 
    
    editorDispatch({
        type: 'SET_IMAGE_DIMS',
        payload: { 
            x: gX,
            y: gY, 
            width: imgWidth, 
            height: imgHeight 
        }
    })
}


export const EditorContext = createContext();

// editor state object
const EditorState = {
    // if the photo is fit to size of fillscreen
    fitting: false,

    grid: {
        rows: 3,
        cols: 3
    },

    // grid dimensions of the photo
    gridDims: {
        gX: 0,
        gY: 0,
        gWidth: 0,
        gHeight: 0,
        cellWidth: 0,
        cellHeight: 0
    },

    imageDims: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    },

    imageLoaded: false,

    // used to trigger image snap
    snap: snap, 
    
    // background color for exported photo
    bgColor: 'white'
}

const EditorContextProvider = (props) => {

    const [editorState, dispatch] = useReducer(EditorReducer, EditorState);
    const editorDispatch = dispatch;

    return (
        <EditorContext.Provider value={{ editorState, editorDispatch }}>
            {props.children}
        </EditorContext.Provider>
    )
}

export default EditorContextProvider;