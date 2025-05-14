import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleSubmit = async () => {
    const newBlog = {
      title,
      content,
      author: user.username,
    };

    await fetch('http://localhost:5000/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBlog),
    });

    navigate('/blogs');
  };

  return (
    <div className='container'>
      <h2>Create New Blog</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" /><br />
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content" /><br />
      <button onClick={handleSubmit}>Post Blog</button>
    </div>
  );
};

export default CreateBlog;
