import React, { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:3021";

export default function App() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: "", content: "", author: "" });
  const [editId, setEditId] = useState(null);
  const [auth, setAuth] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) fetchBlogs();
  }, [user]);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${API}/`);
      setBlogs(res.data.blogs); 
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/login`, auth);
      setUser(res.data.user);
      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
      setForm((prev) => ({ ...prev, author: res.data.user.username }));
      setError("");
    } catch {
      setError("Login failed");
    }
  };

  const handleCreate = async () => {
    try {
      if (editId) {
        alert("Edit functionality is not supported on backend yet.");
        return;
      }
      const res = await axios.post(`${API}/blogs`, form);
      setBlogs([res.data.blog, ...blogs]); 
      setForm({ title: "", content: "", author: user.username });
    } catch (err) {
      console.error("Blog error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/blogs/${id}`);
      setBlogs(blogs.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setBlogs([]);
    setForm({ title: "", content: "", author: "" });
    setAuth({ username: "", password: "" });
    delete axios.defaults.headers.common["Authorization"];
  };

  if (!user) {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            placeholder="Username"
            value={auth.username}
            onChange={(e) => setAuth({ ...auth, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={auth.password}
            onChange={(e) => setAuth({ ...auth, password: e.target.value })}
          />
          <button type="submit">Login</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    );
  }

  return (
    <div>
      <h2>Welcome, {user.username}</h2>
      <button onClick={handleLogout}>Logout</button>

      <h3>Create Blog</h3>
      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        placeholder="Content"
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
      />
      <button onClick={handleCreate}>Post Blog</button>

      <h3>All Blogs</h3>
      <ul>
        {blogs.map((b) => (
          <li key={b._id}>
            <h4>{b.title}</h4>
            <p>{b.content}</p>
            <p><strong>By:</strong> {b.author}</p>
            {(b.author === user.username || user.role === "admin") && (
              <button onClick={() => handleDelete(b._id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
