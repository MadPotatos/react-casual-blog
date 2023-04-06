import React, { useContext, useEffect, useReducer, useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "../ThemeContext.js";


const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {...state, loading: true};
        case 'LOGIN_SUCCESS':
            return {...state, loading: false, loggedInUser: action.payload, error: ''};
        case 'LOGIN_FAIL':
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }

}
export default function LoginPage() {
    const {user, setUser} = useContext(ThemeContext);
    const navigate = useNavigate();
    if (user) {
        navigate("/profile");
    }
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        loggedInUser: null,
        error: ''
    });
    const {loading, loggedInUser, error} = state;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        dispatch({type: 'LOGIN_REQUEST'});
        try{    
            const{data} = await axios.post(`http://jsonplaceholder.typicode.com/users?email=${email}&password=${password}`);
            if(data.length > 0) {
                dispatch({type: 'LOGIN_SUCCESS', payload: data[0]});
            }
            else {
                dispatch({type: 'LOGIN_FAIL', payload: 'Invalid email or password'});
            }
        }
        catch(error) {
            dispatch({type: 'LOGIN_FAIL', payload: error.message});
        }


    }
    useEffect(() => {
        if (loggedInUser) {
            setUser(loggedInUser);
            navigate("/profile");
        }
    }, [loggedInUser]);

    return (
        <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className ="form"> 
            <div className="form-item">
                <label htmlFor="email">Email</label>
                <input name="email" id="email" type="email" required onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form-item">
                <label htmlFor="password">Password</label>
                <input name="password" id="password" type="password" required onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="form-item">
                    <label></label>
                <button>Login</button>
                </div>
                {loading && <div className="form-item"><label></label>Loading...</div>}
                {error && <div className="form-item"><label></label><span  className="error">{error}</span></div>}
                <div className="form-item">
                <label></label>
                    <span>Don't have account? <Link to="/register">Register</Link></span>
                </div>
                </form>
        </div>
    );
    }