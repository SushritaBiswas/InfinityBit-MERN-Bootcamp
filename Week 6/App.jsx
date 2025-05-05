import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Tasks from "./components/Tasks";
import Active from "./components/Active";
import Complete from "./components/Complete";
import About from "./components/About";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app_container">
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/tasks">All Tasks</Link>
          <Link to="/active">Active</Link>
          <Link to="/complete">Completed</Link>
          <Link to="/about">About</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/active" element={<Active />} />
          <Route path="/complete" element={<Complete />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
