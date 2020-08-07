import React, { useContext } from 'react';
import './styles/main.css'

import { ThemeContext } from './contexts/ThemeContext';
import { PageContext } from './contexts/PageContext'
import EditorContextProvider from './contexts/EditorContext';
import IOContextProvider from './contexts/IOContext';

import Editor from "./components/Editor";
import Uploader from "./components/Uploader";
import PostPage from './components/PostPage';

import Steps from './components/Steps';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';


import 'antd/dist/antd.css'

const MySwitch = withStyles({
  switchBase: {
    color: '#ffbb5c',
    '&$checked': {
      color: '#e68a00',
    },
    '&$checked + $track': {
      backgroundColor: '#e68a00',
    },
  },
  label: {
    color: '#000000'
  },
  checked: {},
  track: {},
})(Switch);


// step properties
function App() {

  const { pageNum, pageDispatch } = useContext(PageContext);
  const { theme, themeDispatch } = useContext(ThemeContext);

 

  return (
    <div className={`parent-container grid-container background ${theme}`}>
      <div className={`header flex-container darker ${theme}`}>
        <div className="page-buttons flex-container background">
          {pageNum > 0 && 
            <button className={`header-btn ${theme}`} onClick={
              () => pageDispatch({ type: 'PREVIOUS_PAGE' })
            }>back</button>  
          }
        </div>

        <div className="steps-container darker flex-container">
          <Steps activeStep={pageNum} theme={theme}/>
        </div> 

        <div className="theme-control-container flex-container">
          <h3 className={`label theme-label ${theme}`}>Theme</h3>
          <FormControlLabel
            control={<MySwitch onChange={() => themeDispatch({ type: 'TOGGLE_THEME' })}/>}
          />
        </div>       
      </div>

      <IOContextProvider>
        {pageNum === 0 ? 
        <Uploader /> 
          :
          <EditorContextProvider>
          {pageNum === 1 ? 
            <Editor />     
            : 
          <PostPage />
          }
          </EditorContextProvider>
        }
      </IOContextProvider>
    </div>    
  );
}

export default App;
