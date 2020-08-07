import React, { useContext, useState, useEffect } from 'react'

import { SketchPicker } from 'react-color'
import '../styles/main.css'
import { IOContext } from '../contexts/IOContext'
import { EditorContext } from '../contexts/EditorContext'
import { ThemeContext } from '../contexts/ThemeContext'

import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';


const LightSlider = withStyles({
    root: {
        color: '#ffbb5c',
        height: 5,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);

const DarkSlider = withStyles({
    root: {
        color: '#e68a00',
        height: 5,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);





const EditorMenu = () => {
    
    // editor context properties
    const { editorDispatch, editorState } = useContext(EditorContext);
    const { fitting, gridDims, imageDims, bgColor } = editorState;
    // page context properties
    const { IODispatch } = useContext(IOContext);
    // theme 
    const { theme } = useContext(ThemeContext);
    // editorState properties
    const { grid } = editorState;
    // dimensions properties
    const { cols, rows } = grid;

    // show color picker
    const [showColorPicker, setShowColorPicker] = useState(false);
    
    const handleChangeCols = (e, value) => {
        const cols = value;
        editorDispatch({ type: 'SET_GRID_COLS', payload: cols });
    }

    const handleChangeRows = (e, value) => {
        const rows = value;
        editorDispatch({ type: 'SET_GRID_COLS', payload: 3 });
        editorDispatch({ type: 'SET_GRID_ROWS', payload: rows });
    }

    const exportProject = () => {
        IODispatch({ type: 'INIT_EXPORT' })
    }
 
    useEffect(() => {
        editorDispatch({ type: 'SET_GRID_ROWS', payload: 1 });
    }, [cols, editorDispatch]);

    const toggleShowColorPicker = () => {
        setShowColorPicker(!showColorPicker);
    }


    return (
        <div className="editor-menu-container flex-container">
            <div className={`flex-container editor-menu container ${theme}`}>

                <div className="menu-items flex-container">

                    <button className={`menu-item ${theme}`} onClick={toggleShowColorPicker}>
                        {showColorPicker ? "hide" : "background color"}
                    </button>

                    { showColorPicker ? 
                        <SketchPicker 
                            className={`color-picker menu-item ${theme}`}
                            color={bgColor}
                            disableAlpha={true} 
                            presetColors={[]}
                            onChange={color => editorDispatch(
                                { 
                                    type: 'SET_BG_COLOR', 
                                    payload: color.hex 
                                }
                            )}/> 
                    :  
                        <div>
                            {/* fit vs fill button */}
                            <button 
                                className={`menu-item ${theme}`}
                                onClick={() => {
                                    editorDispatch({ type: 'TOGGLE_FIT' })
                                    editorDispatch({ type: 'SNAP_GRID', 
                                        payload: { imageDims, gridDims, fitting, editorDispatch }
                                    })
                                }}
                            >{fitting ?  "fill grid" : "fit in grid"}</button>

                            {/* grid cols */}
                            <div className={`icon-wrapper menu-item ${theme}`}>
                                <div className={`label ${theme}`}>{"cols: " + cols}</div>
                                { theme === 'light' ? 
                                <LightSlider 
                                valueLabelDisplay="auto" 
                                className={`slider ${theme}`}
                                aria-label="pretto slider" 
                                value={cols}
                                min={1}
                                max={10}
                                onChange={handleChangeCols} 
                                /> : <DarkSlider 
                                valueLabelDisplay="auto" 
                                className={`slider ${theme}`}
                                aria-label="pretto slider" 
                                value={cols}
                                min={1}
                                max={10}
                                onChange={handleChangeCols} 
                                />
                                }
                                
                            </div>
                            

                            {/* grid rows */}
                            <div className={`icon-wrapper menu-item ${theme}`}>
                                <div className={`label ${theme}`}>{ "rows: " + rows }</div>
                                { theme === 'light' ?  <LightSlider 
                                    valueLabelDisplay="auto" 
                                    className={`slider ${theme}`}
                                    aria-label="pretto slider" 
                                    value={rows}
                                    min={1}
                                    max={5}
                                    onChange={handleChangeRows} 
                                    /> :
                                    <DarkSlider  
                                    valueLabelDisplay="auto" 
                                    className={`slider ${theme}`}
                                    aria-label="pretto slider" 
                                    value={rows}
                                    min={1}
                                    max={5}
                                    onChange={handleChangeRows} 
                                    /> }
                            </div>
                            <button className={`menu-item ${theme}`} onClick={exportProject}>save</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default EditorMenu;