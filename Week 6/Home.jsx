import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="page">
      <h1>Welcome to the To-Do List App!</h1>
      <p>Stay organized by tracking your daily tasks.</p>
      <Link to="/tasks">
        <button>Go to Tasks</button>
      </Link>
    </div>
  );
}

export default Home;
