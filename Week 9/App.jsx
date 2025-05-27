// App.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:3021/api";

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
    const res = await axios.get(`${API}/blogs`);
    setBlogs(res.data);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/users/login`, auth);
      setUser(res.data.user);
      setForm({ ...form, author: res.data.user.username });
      setError("");
    } catch (err) {
      setError("Login failed");
    }
  };

  const handleCreate = async () => {
    if (editId) {
      await axios.put(`${API}/blogs/${editId}`, form);
    } else {
      await axios.post(`${API}/blogs`, form);
    }
    setForm({ title: "", content: "", author: user.username });
    setEditId(null);
    fetchBlogs();
  };

  const handleEdit = (blog) => {
    setForm(blog);
    setEditId(blog._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/blogs/${id}`);
    fetchBlogs();
  };

  const handleLogout = () => {
    setUser(null);
    setBlogs([]);
    setForm({ title: "", content: "", author: "" });
    setAuth({ username: "", password: "" }); 
  };

  if (!user) {
    return (
      <div className="container">
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
    <div className="container">
      <h2>Welcome, {user.username}</h2>
      <button onClick={handleLogout}>Logout</button>
      <h3>{editId ? "Edit Blog" : "Create Blog"}</h3>
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
      <button onClick={handleCreate}>{editId ? "Update" : "Post"} Blog</button>

      <h3>All Blogs</h3>
      <ul>
        {blogs.map((blog) => (
          <li key={blog._id}>
            <h4>{blog.title}</h4>
            <p>{blog.content}</p>
            <p>
              <strong>By:</strong> {blog.author}
            </p>
            {blog.author === user.username && (
              <>
                <button onClick={() => handleEdit(blog)}>Edit</button>
                <button onClick={() => handleDelete(blog._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
