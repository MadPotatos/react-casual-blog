import React,{useContext, useState} from 'react';
import { ThemeContext } from '../ThemeContext.js';
import { Link, NavLink, useNavigate } from 'react-router-dom';
export default function NavBar() {
    const [query,setQuery] = useState('');
    const navigate = useNavigate();
   const handleSubmit =(e) =>{
        e.preventDefault();
        navigate(`/search/${query}`);
    }
    const { theme, toggleTheme, user } = useContext(ThemeContext);
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
                {user? (
                    <>
                <NavLink to="/profile" activeClassName ="active">{user.name}</NavLink> 
                <NavLink to="/create" activeClassName ="active">Create post</NavLink> 
                </>
                )
                :
                <NavLink to="/login" activeClassName ="active">Login</NavLink>
            }
               
                <button onClick={toggleTheme}>
                    {theme === 'light'?'Theme:light':'Theme:dark'}
                </button>
            </div>
            </div>
    );
        
}