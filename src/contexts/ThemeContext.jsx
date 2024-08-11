
import {   createContext, useReducer } from "react";
import PropTypes from 'prop-types';

const ThemeContext = createContext();

let ThemeReducer = (state, action) => {
    switch (action.type){
        case 'CHANGE_THEME':
            return {...state, theme: action.payload};
        default:
            return state;
    }
    
}

//themecontextprovider component
const ThemeContextProvider = ({ children }) => {

    let [state, dispatch] = useReducer(ThemeReducer, {
         theme: 'light' 
    })
    let changeTheme = (theme) => {
        dispatch({type: 'CHANGE_THEME', payload: theme})
    }
    const isDark = state.theme === 'dark';
    return (
        <ThemeContext.Provider value={{...state, changeTheme, isDark}}>
            {children}
        </ThemeContext.Provider>
    )
}

ThemeContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { ThemeContext, ThemeContextProvider }