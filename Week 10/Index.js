require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");

const User = require("./models/UserModels.js");
const Blog = require("./models/BlogModels.js");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3021;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/blogDB";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection error:", err));

// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    res.json({ user: { username: user.username } });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

//Create user
// Create user with role-based restrictions
app.post("/users", async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const requesterRole = req.headers.role; // Comes from frontend headers

    if (!username || !password || !role) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Enforce role-based restrictions
    if (requesterRole === "admin" && role !== "user") {
      return res.status(403).json({ error: "Admins can only create users." });
    }
    if (requesterRole === "user") {
      return res
        .status(403)
        .json({ error: "Users are not allowed to create accounts." });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: "Username already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role });

    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    console.error("Error creating user:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.error("Fetch users error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete user
app.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted!" });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create blog
app.post("/blogs", async (req, res) => {
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
});

// Get all blogs with pagination
app.get("/", async (req, res) => {
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
});

// Delete blog
app.delete("/blogs/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted!" });
  } catch (error) {
    console.error(" Delete blog error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});