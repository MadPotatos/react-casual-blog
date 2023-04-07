import axios from "axios";
import React, { useReducer, useState, useContext } from "react";
import { ThemeContext } from '../ThemeContext.js';


const initialState = {
    loading: false,
    createdPost: null,
    error: '',
    success: false
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'RESET_FORM':
            return initialState;
        case 'CREATE_POST_REQUEST':
            return {...state, loading: true};
        case 'CREATE_POST_SUCCESS':
            return {...state, loading: false, createdPost: action.payload, error: '', success: true};
        case 'CREATE_POST_FAIL':
            return {...state, loading: false, error: action.payload, success: false};
        default:
            return state;
    }
}

export default function CreatePostPage() {
    const {backendAPI,user} = useContext(ThemeContext);
    const [state, dispatch] = useReducer(reducer, initialState);
    const {loading, createdPost, error, success} = state;
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({type: 'CREATE_POST_REQUEST'});
        try{
            const data = axios.post(`${backendAPI}/posts`, {
                title,
                 body,
                userId: user.id,
                id: Math.floor(Math.random() * 100000)
            });
            dispatch({type: 'CREATE_POST_SUCCESS', payload: data});
        }
        catch(error) {
            dispatch({type: 'CREATE_POST_FAIL', payload: error.message});
        }
    }
    return (
        <div>
        <h1>Create Post</h1>
        {
            success? (<div className="form-item"><p>Post created successfully</p>
            <button onClick={() => dispatch({type: 'RESET_FORM'})}>Create another post</button>
            </div> 
            
            ) : (
                <form className="form" onSubmit={handleSubmit}>
            <div className="form-item">
                <label htmlFor="title">Title: </label>
                    <input name ="title" type="text" id="title" 
                        onChange = {e => setTitle(e.target.value)}></input>
                    </div>
                        <div className="form-item">
                            <label htmlFor="body">Body: </label>
                                <input name ="body" type="body" id="title" 
                                    onChange = {e => setBody(e.target.value)}></input>
                                    </div>
                            <div className="form-item">
                            <label></label>
                            <button>Create Post</button>
                                </div>
                {
                    loading && <div className="form-item">Loading...
                    <label></label>
                    <span>Loading...</span>
                    </div>

                }
                {
                    error && <div className="form-item">
                    <label></label>
                    <span className="error">{error}</span>
                    </div>
                }
                    </form> 
            )
            
        }
        

        </div>
    );
    }