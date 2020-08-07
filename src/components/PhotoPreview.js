import React, { useContext, useState, useEffect, useRef } from 'react'
import '../styles/main.css'
import { EditorContext } from '../contexts/EditorContext'
import { IOContext } from '../contexts/IOContext'
import { PageContext } from '../contexts/PageContext'
import Konva from 'konva'
import { ThemeContext } from '../contexts/ThemeContext'

const PhotoPreview = () => {


    const { editorState, editorDispatch } = useContext(EditorContext);
    const { fitting, grid, gridDims, imageDims, imageLoaded, snap, bgColor } = editorState;
    const { rows, cols } = grid;

    const { IODispatch, IOState } = useContext(IOContext);
    const { initExport, importPackage } = IOState;

    // page properties
    const { pageDispatch } = useContext(PageContext);
    // theme
    const { theme } = useContext(ThemeContext);

    // canvas dims
    const [canvasDims, setCanvasDims] = useState({ width: 0, height: 0 });
    // mouse pointer style
    const [mouseStyle, setMouseStyle] = useState('pointer');
    

    // image reference
    const image = useRef();
    // photo preview container reference
    const container = useRef();
    // canvas container reference
    const canvas = useRef();

    useEffect(() => {
        // set canvas dims
        const handleResize = () => {
            setCanvasDims({ 
                width: container.current.clientWidth, 
                height: container.current.clientHeight
            })
        }

        let width = container.current.clientWidth;
        let height = container.current.clientHeight;

        if (container.current.clientWidth < 767) {
            height = width;
        }
        setCanvasDims({ width, height })
        
        window.addEventListener('resize', handleResize)

        return () => (window.removeEventListener('resize', handleResize));
    }, []);
    

    useEffect(() => {
        
        const calculateDims = () => {

            let gridDims = { gX: 0, gY: 0, gWidth: 0, gHeight: 0, cellWidth: 0, cellHeight: 0 };
            let gWidth = 0;
            let gHeight = 0;

            // proportion height and width relative to each other 
            if (cols > rows) {
                gWidth = container.current.clientWidth * .65;
                gHeight = gWidth * (rows / cols);
            } else {
                gHeight = container.current.clientHeight * .65;
                gWidth = gHeight * (cols / rows);
            }

            gridDims = { ...gridDims, gWidth, gHeight };
            
            gridDims.gX = ((container.current.clientWidth - gWidth) / 2 - 2);
            gridDims.gY = ((container.current.clientHeight - gHeight) / 2 - 2);

            gridDims.cellWidth = gWidth / cols;
            gridDims.cellHeight = gHeight / rows;
            editorDispatch({ type: 'SET_GRID_DIMS', payload: gridDims });
            return gridDims;
        }


        const drawCanvas = gridDims => {

            
            const handleTransform = () => {
                
                let { x, y } = img.position();
                let { width, height } = img.getClientRect();
                
                let leftDist = x - gX;
                if (leftDist > -10 && leftDist < 10) {
                    x = gX;
                    leftLine.visible(true);
                    img.position({
                        x: x,
                        y: y
                    })
                    
                } else {
                    leftLine.visible(false);
                }
                let topDist = y - gY;
                if (topDist > -10 && topDist < 10) {
                    y = gY;
                    topLine.visible(true);
                    img.position({
                        x: x,
                        y: y
                    })
                } else {
                    topLine.visible(false);
                }
                let rightDist = (x + width) - (gX + gWidth);
                if (rightDist > -10 && rightDist < 10) {
                    x = gX + gWidth - width;
                    rightLine.visible(true);
                    img.position({
                        x: x,
                        y: y
                    })
                } else {
                    rightLine.visible(false);
                }
                let bottomDist = (y + height) - (gY + gHeight);
                if (bottomDist > -10 && bottomDist < 10) {
                    y = gY + gHeight - height
                    bottomLine.visible(true);
                    img.position({
                        x: x,
                        y: y
                    })
                } else {
                    bottomLine.visible(false);
                }
                let centerDistH = (x - gX) + (width - gWidth) / 2;
                if (centerDistH > -7 && centerDistH < 7) {
                    x = gX + (gWidth - width) / 2;
                    centerLineH.visible(true);
                    img.position({
                        x: x,
                        y: y
                    })
                } else {
                    centerLineH.visible(false);
                }
                let centerDistV = (y - gY) + (height - gHeight) / 2;
                if (centerDistV > -7 && centerDistV < 7) {
                    y = gY + (gHeight - height) / 2;
                    centerLineV.visible(true);
                    img.position({
                        x: x,
                        y: y
                    })
                } else {
                    centerLineV.visible(false);
                }
                stage.batchDraw();
            }

            const handleTransformEnd = () => {
                leftLine.visible(false);
                topLine.visible(false);
                rightLine.visible(false);
                bottomLine.visible(false);
                centerLineH.visible(false);
                centerLineV.visible(false);
                stage.batchDraw();

                

                editorDispatch({ 
                    type: 'SET_IMAGE_DIMS', 
                    payload: {
                        ...img.getClientRect()
                    }
                });
            }
           
            let stage = new Konva.Stage({
                container: 'photo-preview-container',
                ...canvasDims
            });

            let layer = new Konva.Layer();
            stage.add(layer);

            let { gX, gY, gWidth, gHeight, cellWidth, cellHeight } = gridDims;

            let background = new Konva.Rect({
                x: gX,
                y: gY,
                width: gWidth, 
                height: gHeight,
                fill: bgColor
            })

            layer.add(background);

            // snaplines
            let leftLine = new Konva.Line({
                stroke: 'red',
                strokeWidth: 2,
                points: [gX, gY, gX, gHeight + gY],
                visible: false,
                listening: false
            });

            // snaplines
            let topLine = new Konva.Line({
                stroke: 'red',
                strokeWidth: 2,
                points: [gX, gY, gX + gWidth, gY],
                visible: false,
                listening: false
            });

            // snaplines
            let rightLine = new Konva.Line({
                stroke: 'red',
                strokeWidth: 2,
                points: [gX + gWidth, gY, gX + gWidth, gHeight + gY],
                visible: false,
                listening: false
            });

            // snaplines
            let bottomLine = new Konva.Line({
                stroke: 'red',
                strokeWidth: 2,
                points: [gX, gY + gHeight, gX + gWidth, gHeight + gY],
                visible: false,
                listening: false
            });

            // snaplines
            let centerLineV = new Konva.Line({
                stroke: 'red',
                strokeWidth: 1,
                points: [gX, gY + (gHeight / 2), gX + gWidth, gY + (gHeight / 2)],
                visible: false,
                listening: false
            });

            // snaplines
            let centerLineH = new Konva.Line({
                stroke: 'red',
                strokeWidth: 1,
                points: [gX + (gWidth / 2), gY, gX + (gWidth / 2), gY + gHeight],
                listening: false,
                visible: false
            });


            // image
            let img = new Konva.Image({
                image: image.current,
                ...imageDims,
                draggable: true,
            });

            // image event listeners
            img.on('dragmove', () => handleTransform());
            img.on('dragend', () => handleTransformEnd());
            img.on('mouseover', () => setMouseStyle('move'));
            img.on('mouseout', () => setMouseStyle('default'));
            img.on('transformend', () => handleTransformEnd());


            // add image and lines to layer
            layer.add(img);
            layer.add(leftLine);
            layer.add(topLine);
            layer.add(rightLine);
            layer.add(bottomLine);
            layer.add(centerLineH);
            layer.add(centerLineV);

            // build grid
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    let rect = new Konva.Rect({
                        width: cellWidth,
                        height: cellHeight,
                        stroke: 'gray',
                        strokeWidth: 1,
                        dash: [5, 2],
                        x: gX + col * cellWidth,
                        y: gY + row * cellHeight,
                        listening: false
                    });

                    layer.add(rect);
                }
            }
            
            // create new transformer
            let tr = new Konva.Transformer({
                anchorStrokeWidth: 1                
            });

            // bind transformer to image
            layer.add(tr);
            tr.nodes([img]);

            layer.draw();
        }

        if (imageLoaded) {
            let gridDims = calculateDims();
            drawCanvas(gridDims);
        }
    }, [rows, cols, imageLoaded, imageDims, bgColor, canvasDims]);


    useEffect(() => {

        // save image by grid
        const saveImage = () => {

            editorDispatch({ type: 'SET_IMAGE_DIMS', payload: imageDims });
            editorDispatch({ type: 'SET_GRID_DIMS', payload: gridDims });

            let canvasArr = [];

            // calculate cell width and heights
            let { gX, gY, cellWidth, cellHeight } = gridDims;

            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    let stage = new Konva.Stage({
                        container: 'photo-preview-container',
                        width: cellWidth,
                        height: cellHeight
                    });
            
                    var layer = new Konva.Layer();
                    stage.add(layer);

                    var background = new Konva.Rect({
                        x: 0,
                        y: 0,
                        width: cellWidth,
                        height: cellHeight,
                        fill: bgColor,
                    });
                    // add the shape to the layer
                    layer.add(background);

                    let { x, y, width, height } = imageDims;
                    if (!x) x = 0;
                    if (!y) y = 0;
                   
                    // draw image to stage
                    var kImage = new Konva.Image({
                        x: x - (cellWidth * col) - gX,
                        y: y - (cellHeight * row) - gY,
                        image: image.current,
                        width: width,
                        height: height,
                    });
            
                    layer.add(kImage);
                    canvasArr.push(stage);
                }
            }      
            
            console.log('saving..')

            // calculate pixel ratio to export 1080x1080 image
            let pixelRatio = (1080 / cellWidth) * 2;
            let dataURLs = [];

            for (let i = 0; i < canvasArr.length; i++) { 

                var dataURL = canvasArr[i].toDataURL({ pixelRatio: pixelRatio });
                dataURLs.push(dataURL);
            }

            IODispatch({ type: 'EXPORT_IMG', payload: dataURLs });
            pageDispatch({ type: 'NEXT_PAGE' });
        }
  
        if(initExport) {
            saveImage();
        }
    }, [initExport]);
  
    const handleImageLoad = e => {
        if(!imageLoaded) {
            console.log('loaded')

            editorDispatch({ 
                type: 'SET_IMAGE_DIMS',
                payload: {
                    ...imageDims,
                    width: image.current.clientWidth, height: image.current.clientHeight }
                });
        }
        editorDispatch({ type: 'IMAGE_LOADED' });
    }           


    return (
        <div className="photo-preview flex-container">
            <div className={`canvas-container container round-container ${theme}`}  ref={container}>
                <div  
                    className="photo-stage" 
                    id="photo-preview-container"
                    style={{ 
                        cursor: mouseStyle,
                        ...canvasDims
                    }}
                    ref={canvas}
                >         
                    {importPackage && <img 
                        className="image" 
                        id="image-edit" 
                        ref={image}
                        src={importPackage} // importPackage
                        alt="to edit"
                        onLoad={handleImageLoad}
                    />}
                </div>            
            </div>
        </div>
        
    )
}

export default PhotoPreview;