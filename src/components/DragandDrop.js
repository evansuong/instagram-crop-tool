import React, { useRef, useState, useEffect, useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext';

var dragCounter = 0;

const DragandDrop = (props) => {

    const dropRef = useRef();
    const [dragging, setDragging] = useState(false);

    const { theme } = useContext(ThemeContext);

    console.log(dragCounter);

    const handleDrag = e => {
        e.preventDefault();
        e.stopPropagation();
    }

    const handleDragIn = e => {
        e.preventDefault();
        e.stopPropagation();
        dragCounter = dragCounter + 1;
        // check if event has data in it
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setDragging(true);
        }
    }

    const handleDragOut = e => {
        e.preventDefault();
        e.stopPropagation();
        // prevent dragging to be set false until it leaves all child components
        dragCounter = dragCounter - 1;
        console.log(dragCounter)
        if (dragCounter > 0) return
        // if mouse leaves window
        setDragging(false);
    }

    const handleDrop = e => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            props.importImage(e.dataTransfer.files);
            // e.dataTransfer.clearData();
            // dragCounter.current = 0;
        }
    }

    useEffect(() => {
        dragCounter = 0;
        let div = dropRef.current;
        div.addEventListener('dragenter', handleDragIn);
        div.addEventListener('dragleave', handleDragOut);
        div.addEventListener('dragover', handleDrag);
        div.addEventListener('drop', handleDrop);

        return () => {
            let div = dropRef.current;
            div.removeEventListener('dragenter', handleDragIn);
            div.removeEventListener('dragleave', handleDragOut);
            div.removeEventListener('dragover', handleDrag);
            div.removeEventListener('drop', handleDrop);
        }
    }, [])

    return (
        <div className={`upload-container container flex-container ${theme}`} ref={dropRef}>
            {dragging && 
                <div
                    style={{
                        border: 'dashed grey 4px',
                        backgroundColor: 'rgba(255,255,255,.8)',
                        width: '100%',
                        height: '100%',
                        zIndex: 9999,
                        borderRadius: '15px'
                    }}>
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: 0,
                            left: 0,
                            textAlign: 'center',
                            color: 'grey',
                            fontSize: 36
                        }}
                    >
                        <div>Feed Me...</div>
                    </div>
                </div>
            }
            {props.children}
        </div>
    )
}

export default DragandDrop;