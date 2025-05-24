import express from 'express';
import Blog from '../models/BlogModels.js';

const router = express.Router();

// Get all blogs
router.get('/', async (req, res) => {
    const blogs = await Blog.find();
    res.json(blogs);
});

// Create a new blog
router.post('/', async (req, res) => {
    const newBlog = new Blog(req.body);
    await newBlog.save();
    res.status(201).json({ message: 'Blog added successfully' });
});

// Delete a blog
router.delete('/:id', async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted' });
});

// Edit a blog
router.put('/:id', async (req, res) => {
    await Blog.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Blog updated' });
});

export default router;
