import React, { useReducer, createContext } from "react";
import PageReducer from "../reducers/PageReducer";

export const PageContext = createContext();

const PageContextProvider = (props) => {

    const [pageNum, dispatch] = useReducer(PageReducer, 0); // 1
    const pageDispatch = dispatch;

    return (
        <PageContext.Provider value={{ pageNum, pageDispatch }}>
            {props.children}
        </PageContext.Provider>
    );
}

export default PageContextProvider;