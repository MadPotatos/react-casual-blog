import React,{useEffect, useReducer} from 'react';
import { useParams } from "react-router";
import { Link } from 'react-router-dom';
import axios from 'axios';  

const reducer = (state, action) => {
    switch (action.type) {
        case 'POST_REQUEST':
            return {...state, loading: true};
        case 'POST_SUCCESS':
            return {...state, loading: false, post: action.payload, error: ''};
        case 'POST_FAIL':
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
};

export default function PostPage() {
    const { postId } = useParams();
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        post: {user:{}},
        error: '',
      
    });
    const{loading, post, error} = state;
  
        const fetchPost = async () => {
            dispatch({type: 'POST_REQUEST'});
            try {
                const {data} = await axios.get(`/api/posts/${postId}`);
                const {data: userData} = await axios.get(`/api/users/${data.userId}`);
                dispatch({type: 'POST_SUCCESS', payload: {...data,user : userData}});
            } catch (error) {
                dispatch({type: 'POST_FAIL', payload: error.message});
            }
        };
    useEffect(() => {
        fetchPost();
    }, []);   
    return (
        <div>
            <Link to="/">Back to Home</Link>
            <div className = "blog">
                <div className = "content">
                    {loading? <div>Loading...</div> : 
                    error? <div>{error}</div> :(
                        <div>
                            <h1>{post.title}</h1>
                            <p>{post.body}</p>
                        </div>
                    )}
                 
                    </div>
                    <div className = "sidebar">
                    <h2>{post.user.name}</h2>
                    <ul>
                        <li>Email: {post.user.email}</li>
                        <li>Phone: {post.user.phone}</li>
                        <li>Website: {post.user.website}</li>
                    </ul>
                    </div>
            </div>
            
        </div>
    );
    }

