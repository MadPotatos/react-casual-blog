import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/HomePage";
import CreatePost from "./pages/CreatePostPage";
import Login from "./pages/LoginPage";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
    <Router>
      <nav>
      <div className="nav-item">
        <Link to="/"> Casual Blog </Link>
      </div>
        
        {!isAuth ? (
          <div className="nav-item">
          <Link to="/login"> Login </Link>
          </div>
        ) : (
          <>        
          <div className="nav-item">           
          <Link to="/createpost"> Create Post </Link>
            <button className="logout-btn" onClick={signUserOut}> Log Out</button>
          </div>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;