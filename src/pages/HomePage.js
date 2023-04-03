import React,{useEffect, useReducer} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const reducer = (state, action) => {
    switch (action.type) {
        case 'POSTS_REQUEST':
            return {...state, loading: true};
        case 'POSTS_SUCCESS':
            return {...state, loading: false, posts: action.payload, error: ''};
        case 'POSTS_FAIL':
            return {...state, loading: false, error: action.payload};
            case 'USERS_REQUEST':
                return {...state, loadingUsers: true};
            case 'USERS_SUCCESS':
                return {...state, loadingUsers: false, users: action.payload, errorUsers: ''};
            case 'USERS_FAIL':
                return {...state, loadingUsers: false, errorUsers: action.payload};
        default:
            return state;
    }
};

export default function HomePage() {
    const [state, dispatch] = useReducer(reducer, {
        loading: false, 
        posts: [], 
        error: '',
        loadingUsers: false,
        users: [],
        errorUsers: ''
    });
    const{loading, posts, error, loadingUsers, errorUsers, users} = state;
    const loadPosts = async () => {
        dispatch({type: 'POSTS_REQUEST'});
        try {
            const {data} = await axios.get('https://jsonplaceholder.typicode.com/posts');
            dispatch({type: 'POSTS_SUCCESS', payload: data});
        } catch (error) {
            dispatch({type: 'POSTS_FAIL', payload: error.message});
        }
    };

    const loadUsers = async () => {
        dispatch({type: 'POSTS_REQUEST'});
        try {
            const {data} = await axios.get('https://jsonplaceholder.typicode.com/users');
            dispatch({type: 'USERS_SUCCESS', payload: data});
        } catch (error) {
            dispatch({type: 'USERS_FAIL', payload: error.message});
        }
    };

    useEffect(() => {
        loadPosts();
        loadUsers();
    }, []);

       
    return (
        <div className='blog'>
            <div className='content'>
            <h1> Posts </h1>
            {loading ? <div>Loading...</div> 
            : error ? <div>{error}</div> 
            : posts.length === 0 ? <div>No posts</div> 
            : (<ul>{posts.map((post => <li key={post.id}>
                <Link to = {`/post/${post.id}`}><h2>{post.title}</h2></Link>
                
                <p>{post.body}</p>
            </li>))}</ul>
            )}
        </div>
        <div className='sidebar'>
            <h1> Authors </h1>
            {loadingUsers ? <div>Loading...</div> 
            : errorUsers ? <div>{errorUsers}</div> 
            : users.length === 0 ? <div>No users</div> 
            : (<ul>{users.map((user => <li key={user.id}>
                {user.name}
            </li>))}</ul>
            )}
            </div>
        </div>
    );
}
