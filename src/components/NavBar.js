import React,{useContext} from 'react';
import { ThemeContext } from '../ThemeContext';
import { Link } from 'react-router-dom';
export default function NavBar() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <div className="header">
            <div className="header-item">
                <Link to="/">
                    <strong>Casual Blog</strong>
                </Link>
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