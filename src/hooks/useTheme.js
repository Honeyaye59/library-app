import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';


export default function Theme  ()  {
    let contexts = useContext(ThemeContext);
    if(contexts === undefined){
        new Error('theme context should be used in ThemeContentProvider')
    }
    return contexts;
}