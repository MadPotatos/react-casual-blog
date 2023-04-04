import {BrowserRouter, Route, Routes} from 'react-router-dom';
import React,{useContext} from 'react';
import './App.css';
import NavBar from './components/NavBar';
import { ThemeContext } from './ThemeContext';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';

function App() {
  const { theme } = useContext(ThemeContext);
  return (  
    <BrowserRouter>
    <div className={`container ${theme}`}>
      <NavBar />
      <div className="main">
        <Routes>
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
