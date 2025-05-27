import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import Blog from "./models/BlogModels.js";
import User from "./models/UserModels.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3021;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/crudDB";

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Graceful exit
  });

//Routes
// Get all blogs
app.get("/", async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
});

// Get a single blog by ID
app.get("/api/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create a blog
app.post("/api/blogs", async (req, res) => {
  const { title, content, author } = req.body;
  if (!title || !content || !author) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const newBlog = new Blog(req.body);
  await newBlog.save();
  res.status(201).json({ message: "Blog created" });
});

// Update a blog
app.put("/api/blogs/:id", async (req, res) => {
  await Blog.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Blog updated" });
});

// Delete a blog
app.delete("/api/blogs/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Blog deleted" });
});

//User routes

// Login route
app.post("/api/users/login", async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne({ username });

  if (user) {
    res.json({ success: true, user });
  } else {
    res.status(401).json({ success: false, message: "User not found" });
  }
});

//Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
