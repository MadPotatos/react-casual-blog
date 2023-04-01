
import './App.css';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="container light">
      <NavBar />
      <div className="main">
        <h1> Posts </h1>
          <ul>
            <li><h2>Post 1 </h2><p>Post 1 content</p></li>
            <li><h2>Post 2 </h2><p>Post 2 content</p></li>
            </ul>
      </div>
      <div className="footer"> Nguyen Tien Viet - 20194718 </div>
    </div>
  );
}

export default App;
