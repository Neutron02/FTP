import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import UploadPage from './UploadPage';
const HomePage = () => {
  return (
    <div className="container">
      <h1 className="title">Welcome to FTP WebApp</h1>
    </div>
  );
};

function App() {
  return (
      <div className="container">
        <header className="header">
          <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="/download">Download</Link>
            <Link to="/upload">Upload</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" exact Component={HomePage} /> 
          <Route path="/upload" element={<UploadPage />} />

        </Routes>
        {/* Add other routes as needed here */}
      </div>
  );
}

export default App;
