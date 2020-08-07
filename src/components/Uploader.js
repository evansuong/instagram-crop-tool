import React, { useContext, useState, useEffect } from 'react'
import { PageContext } from '../contexts/PageContext';
import { IOContext } from '../contexts/IOContext';
import DragandDrop from './DragandDrop';
import { ThemeContext } from '../contexts/ThemeContext';

const Uploader = () => {

    const { pageDispatch } = useContext(PageContext);
    const { IODispatch } = useContext(IOContext);
    const { theme } = useContext(ThemeContext);

    const [URL, setURL] = useState();

    const importImage = (files) => {
        let reader = new FileReader();
        reader.addEventListener('load', () => setURL(reader.result))
        reader.readAsDataURL(files[0]);
    } 

    const importImageBtn = e => {
        let files = e.target.files;
        let reader = new FileReader();
        reader.addEventListener('load', () => setURL(reader.result))
        reader.readAsDataURL(files[0]);
    }

    useEffect(() => {
        if(URL) {
            IODispatch({ type: 'IMPORT_IMG', payload: URL });
            pageDispatch({ type: 'NEXT_PAGE' });
        }
    }, [URL])

    return (
        <div className={`upload-page-container grid-container background ${theme}`}>
            <DragandDrop importImage={importImage}>
                <div className={`upload-input`}>
                    <button className={`upload-btn ${theme}`}>choose file</button> 
                    <input 
                        className={`upload-input-btn highlight ${theme}`}
                        type="file" 
                        name="choose image" 
                        onChange={importImageBtn}
                    />
                    <h3 className={`highlight ${theme}`}>or</h3>
                    <h2 className={`highlight ${theme}`}>-drag and drop-</h2>
                </div>
            </DragandDrop>
        </div>
    )
}

export default Uploader;