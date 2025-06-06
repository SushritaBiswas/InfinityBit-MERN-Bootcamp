const Blog = require("../models/BlogModels");

//Creating blogs
const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Missing fields!" });
    }

    const newBlog = new Blog({ title, content });
    await newBlog.save();

    res
      .status(201)
      .json({ message: "Blog created successfully!", blog: newBlog });
  } catch (error) {
    console.error("Blog creation error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Getting blogs
const getAllBlogs = async (req,res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const blogs = await Blog.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalBlogs = await Blog.countDocuments();
    res.json({ blogs, totalPages: Math.ceil(totalBlogs / limit) });
  } catch (error) {
    console.error(" Fetch blogs error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Deleting blogs
const deleteBlogs = async (req,res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted!" });
  } catch (error) {
    console.error(" Delete blog error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createBlog, getAllBlogs, deleteBlogs };
