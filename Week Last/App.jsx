import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"; 

axios.defaults.baseURL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

function App() {
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [auth, setAuth] = useState({ username: "", password: "" });
  const [blogForm, setBlogForm] = useState({ title: "", content: "" });
  const [userForm, setUserForm] = useState({
    username: "",
    password: "",
    role: "user",
  });

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchBlogs(); // fetch only after login
    } else {
      delete axios.defaults.headers.common["Authorization"];
      setBlogs([]); // clear blogs on logout
    }
  }, [token]);

  const login = async () => {
    try {
      const res = await axios.post("/login", auth);
      setToken(res.data.token);
      setRole(res.data.user.role);
      alert("Login successful");
    } catch (err) {
      alert("Login failed");
    }
  };

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("/");
      setBlogs(res.data.blogs);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  const createBlog = async () => {
  try {
    await axios.post("/blogs", blogForm);
    setBlogForm({ title: "", content: "" });
    fetchBlogs();
  } catch (err) {
    console.error("Blog creation error:", err.response ? err.response.data : err);
    alert("Blog creation failed");
  }
};

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`/blogs/${id}`);
      fetchBlogs();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/users");
      setUsers(res.data);
    } catch (err) {
      alert("Fetching users failed");
    }
  };

  const createUser = async () => {
    try {
      await axios.post("/users", userForm);
      setUserForm({ username: "", password: "", role: "user" });
      fetchUsers();
    } catch (err) {
      alert("User creation failed");
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      alert("Delete user failed");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="pageWrapper">
      <h1 className="pageTitle">📝 Blog App</h1>

      {!token && (
        <div className="loginWrapper">
          <h2 className="pageTitle">Login</h2>
          <div className="loginForm">
            <input
              className="inputField"
              placeholder="Username"
              onChange={(e) => setAuth({ ...auth, username: e.target.value })}
            />
            <input
              className="inputField"
              type="password"
              placeholder="Password"
              onChange={(e) => setAuth({ ...auth, password: e.target.value })}
            />
            <button className="submitButton" onClick={login}>
              Login
            </button>
          </div>
        </div>
      )}

      {token && (
        <>
          <p>
            ✅ Logged in as <strong>{role}</strong>
          </p>
          <button
            className="logoutButton"
            onClick={() => {
              setToken("");
              setRole("");
            }}
          >
            Logout
          </button>

          <h2 className="pageTitle">Create Blog</h2>
          <div className="blogForm">
            <input
              className="inputField"
              placeholder="Title"
              value={blogForm.title}
              onChange={(e) =>
                setBlogForm({ ...blogForm, title: e.target.value })
              }
            />
            <textarea
              className="textAreaField"
              placeholder="Content"
              value={blogForm.content}
              onChange={(e) =>
                setBlogForm({ ...blogForm, content: e.target.value })
              }
            />
            <button className="submitButton" onClick={createBlog}>
              Post
            </button>
          </div>
        </>
      )}

      {token && (
        <>
          <h2 className="pageTitle">All Blogs</h2>
          {blogs.map((b) => (
            <div className="blogItem" key={b._id}>
              <h3 className="blogTitle">{b.title}</h3>
              <p className="blogContent">{b.content}</p>
              <div className="blogHeader">
                <span className="blogAuthor">
                  {b.author?.username || "Unknown"}
                </span>
              </div>
              <button className="deleteBtn" onClick={() => deleteBlog(b._id)}>
                Delete
              </button>
            </div>
          ))}
        </>
      )}

      {role === "admin" && (
        <>
          <h2 className="pageTitle">👤 Admin: User Management</h2>
          <button className="submitButton" onClick={fetchUsers}>
            Refresh Users
          </button>
          <ul>
            {users.map((u) => (
              <li key={u._id}>
                {u.username} ({u.role})
                <button className="deleteBtn" onClick={() => deleteUser(u._id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>

          <h3 className="pageTitle">Create User</h3>
          <div className="userForm">
            <input
              className="inputField"
              placeholder="Username"
              value={userForm.username}
              onChange={(e) =>
                setUserForm({ ...userForm, username: e.target.value })
              }
            />
            <input
              className="inputField"
              type="password"
              placeholder="Password"
              value={userForm.password}
              onChange={(e) =>
                setUserForm({ ...userForm, password: e.target.value })
              }
            />
            <select
              className="inputField"
              value={userForm.role}
              onChange={(e) =>
                setUserForm({ ...userForm, role: e.target.value })
              }
            >
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
            <button className="submitButton" onClick={createUser}>
              Create
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
