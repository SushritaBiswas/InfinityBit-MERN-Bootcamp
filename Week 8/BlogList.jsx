import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetch('http://localhost:5000/api/blogs')
      .then(res => res.json())
      .then(data => setBlogs(data));
  }, []);

  const deleteBlog = async (id) => {
    await fetch(`http://localhost:5000/api/blogs/${id}`, { method: 'DELETE' });
    setBlogs(blogs.filter(blog => blog._id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className='container'>
      <h2>Welcome, {user?.username}</h2>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => navigate('/create')}>Create New Blog</button>
      <ul>
        {blogs.map(blog => (
          <li key={blog._id}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            <p><strong>Author:</strong> {blog.author}</p>
            {blog.author === user?.username && (
              <>
                <button onClick={() => navigate(`/edit/${blog._id}`)}>Edit</button>
                <button onClick={() => deleteBlog(blog._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
