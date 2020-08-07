import React, { useContext } from 'react';
import { IOContext } from '../contexts/IOContext';
import { ThemeContext } from '../contexts/ThemeContext'


const PostPage = () => {

    // io properties
    const { IOState } = useContext(IOContext);
    const { exportPackage } = IOState;

    // theme 
    const { theme } = useContext(ThemeContext);

    const downloadExport = (e, extension) => {
        for (let i = 0; i < exportPackage.length; i++) {
            let a = document.createElement('a');
            a.href = exportPackage[i];
            a.download = `snap-img-${i+1}${extension}`;
            a.click();
        }
    }

    // TODO: clean shit up and figure out how to host this on a real website
    return (
        <div className={`post-page-container container flex-container ${theme}`}>
            <div className="post-container grid-container">
                <h2 className={`label ${theme}`}>You're Done!</h2>
                <div className={`previews flex-container background ${theme}`}>
                    { exportPackage.map((url, i) => 
                        <img 
                            className={`finished-preview darker ${theme}`} 
                            src={url} 
                            key={i} 
                            alt="preview"
                            />) }
                </div>

                <div className="upload-btn-bar flex-container">
                    <button className={theme} onClick={() => downloadExport('.jpg')}>
                        download jpg
                        </button>
                    <button className={theme} onClick={() => downloadExport('.png')}>
                        download png
                        </button>
                </div>
            </div>
        </div>
       
    )
}

export default PostPage;