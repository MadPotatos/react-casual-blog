import React,{useEffect, useReducer,useContext} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from "react-router";
import { ThemeContext } from '../ThemeContext.js';

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
            case 'USER_SUCCESS':
                return {...state, loadingUsers: false, user: action.payload, errorUsers: ''};
            case 'USERS_FAIL':
                return {...state, loadingUsers: false, errorUsers: action.payload};
        default:
            return state;
    }
};

export default function HomePage() {
    const {backendAPI} = useContext(ThemeContext);
    const {query, userId} = useParams();
    const [state, dispatch] = useReducer(reducer, {
        loading: false, 
        posts: [], 
        error: '',
        loadingUsers: false,
        users: [],
        user: {},
        errorUsers: ''
    });
    const{loading, posts, error, loadingUsers, errorUsers, users, user} = state;
   
    const loadPosts = async () => {
        dispatch({type: 'POSTS_REQUEST'});
        try {
            const {data} = await axios.get(
                
                userId
                ? `${backendAPI}/posts?userId=${userId}`
                : `${backendAPI}/posts`
                );
            const filterPosts = query ? data.filter(x =>
                x.title.indexOf(query) >= 0 ||
               x.body.indexOf(query) >= 0) : data;
            dispatch({type: 'POSTS_SUCCESS', payload: filterPosts});
        } catch (error) {
            dispatch({type: 'POSTS_FAIL', payload: error.message});
        }
    };

    const loadUsers = async () => {
        dispatch({type: 'USERS_REQUEST'});
        try {
            const {data} = await axios.get(
               
                userId
                ? `${backendAPI}/users/${userId}`
                : `${backendAPI}/users`
                );
                dispatch({type: userId ? 'USER_SUCCESS' : 'USERS_SUCCESS', payload: data});
        } catch (error) {
            dispatch({type: 'USERS_FAIL', payload: error.message});
        }
    };

    useEffect(() => {
        loadPosts();
        loadUsers();
    }, [query, userId,backendAPI]);  

       
    return (
        <div className='blog'>
            <div className='content'>
            <h1>  {query? `Search results for "${query}"` : 
                userId ? `${user.name}'s Posts` : 'All Posts'}
             </h1>
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
            {loadingUsers ? <div>Loading...</div> 
            : errorUsers ? <div>{errorUsers}</div> 
            : users.length === 0 ? <div>No users</div> 
            : (
                userId?
                <div>
                    <h2>{user.name}'s Profile</h2>
                    <ul>
                        <li><b>Email:</b> {user.email}</li>
                        <li><b>Phone:</b> {user.phone}</li>
                        <li><b>Website:</b> {user.website}</li>
                </ul>
                    </div>
                :
                <div>
                       <h2> Authors </h2>
                       <ul>{users.map((user => <li key={user.id}>
                <Link to = {`/user/${user.id}`}>{user.name}</Link>
            </li>))}</ul>
                       </div>
            
            )}
            </div>
        </div>
    );
}
