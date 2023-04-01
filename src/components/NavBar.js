import React,{useContext} from 'react';
import { ThemeContext } from '../ThemeContext';
export default function NavBar() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <div className="header">
            <div className="header-item">
                <a href="/">
                    <strong>Casual Blog</strong>
                </a>
            </div>
            <div className="header-item">
                <a href="/login">Login</a>
                <button onClick={toggleTheme}>
                    {theme === 'light'?'Theme:light':'Theme:dark'}
                </button>
            </div>
            </div>
    );
        
}