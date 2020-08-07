import React, { createContext, useReducer } from 'react'
import ThemeReducer from '../reducers/ThemeReducer';


export const ThemeContext = createContext();

const Theme = 'light';


const ThemeContextProvider = (props) => {

    const [theme, dispatch] = useReducer(ThemeReducer, Theme);
    const themeDispatch = dispatch;


    return (
        <ThemeContext.Provider value={{ theme, themeDispatch }}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider;
