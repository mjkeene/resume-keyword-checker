import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogDetail from './pages/BlogDetail';
import About from './pages/About';
import JobBoards from './pages/JobBoards';
import logo2 from "./JobHero.png";

function App() {
  return (
    <Router>
      <header>
        <div className="logo-container">
          <img src={logo2} alt="JobHero Logo" className="logo" />
        </div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/blog">Blog Articles</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/jobBoards">JobBoards</Link></li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />  {/* Capture dynamic ID */}
        <Route path="/about" element={<About />} />
        <Route path="/jobBoards" element={<JobBoards />} />
      </Routes>
    </Router>
  );
}

export default App;