import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/`)
      .then(res => res.json())
      .then(data => {
        const currentBlog = data.find(b => b.id === parseInt(id));
        if (currentBlog) setBlog(currentBlog);
        else navigate('/blogs');
      });
  }, [id]);

  const handleUpdate = async () => {
    await fetch(`http://localhost:5000/api/blogs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog),
    });
    navigate('/blogs');
  };

  return (
    <div className='container'>
      <h2>Edit Blog</h2>
      <input value={blog.title} onChange={e => setBlog({ ...blog, title: e.target.value })} /><br />
      <textarea value={blog.content} onChange={e => setBlog({ ...blog, content: e.target.value })} /><br />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default EditBlog;
