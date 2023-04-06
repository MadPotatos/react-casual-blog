import React,{useContext, useState} from 'react';
import { ThemeContext } from '../ThemeContext';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';

export default function NavBar() {
    const [query,setQuery] = useState('');
    const navigate = useNavigate();
   const handleSubmit =(e) =>{
        e.preventDefault();
        navigate(`/search/${query}`);
    }
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <div className="header">
            <div className="header-item">
                <Link to="/">
                    <strong>Casual Blog</strong>
                </Link>
            </div>
            <div className="header-item">
                    <form onSubmit={handleSubmit}>
                        <input name ="query" type='text' placeholder='Search posts' onChange={e => setQuery(e.target.value)}>                           
                        </input>
                        <button>Search</button>
                    </form>
                    </div>
            <div className="header-item">
                <NavLink to="/login" activeClassName ="active">Login</NavLink>
                <button onClick={toggleTheme}>
                {theme === 'light'
                     ? <FontAwesomeIcon icon={faLightbulb} />
                    : <FontAwesomeIcon icon={faLightbulb} />}
                </button>
            </div>
            </div>
    );
        
}