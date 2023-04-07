import {BrowserRouter, Route, Routes} from 'react-router-dom';
import React,{useContext} from 'react';
import './App.css';
import NavBar from './components/NavBar.js';
import { ThemeContext } from './ThemeContext.js';
import HomePage from './pages/HomePage.js';
import PostPage from './pages/PostPage.js';
import LoginPage from './pages/LoginPage.js';
import ProfilePage from './pages/ProfilePage.js';
import PrivateRoute from './components/PrivateRoute.js';

function App() {
  const { theme } = useContext(ThemeContext);
  return (  
    <BrowserRouter>
    <div className={`container ${theme}`}>
      <NavBar />
      <div className="main">
        <Routes>
         
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          
            <Route path="/login" element = {<LoginPage />} />
          <Route path="/post/:postId" element = {<PostPage />} /> 
            <Route path="/search/:query?" element = {<HomePage />} />  
            <Route path="/user/:userId" element = {<HomePage />} />         
          <Route path="/" element = {<HomePage />} />      
            </Routes>
       
      </div>
      <div className="footer"> Nguyen Tien Viet - 20194718 </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
