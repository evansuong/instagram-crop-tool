import React, { useContext } from 'react'
import '../styles/main.css'
import PhotoPreview from './PhotoPreview'
import EditorMenu from './EditorMenu'
import { ThemeContext } from '../contexts/ThemeContext'


const Editor = () => {

    const { theme } = useContext(ThemeContext);

    return (
        <div className={`editor-page-container grid-container background ${theme}`}>
            <PhotoPreview />
            <EditorMenu />
            {/* <button onClick={() => pageDispatch({ type: 'PREVIOUS_PAGE' })}>prev</button> */}
        </div>
    )
}

export default Editor;