const express = require("express");
const router = express.Router();
const verifyToken = require("../service/Authentication");

const {
  createBlog,
  getAllBlogs,
  deleteBlogs,
} = require("../controllers/BlogController");

router.post("/blogs", verifyToken, createBlog);
router.get("/", getAllBlogs);
router.delete("/blogs/:id", verifyToken, deleteBlogs);

module.exports = router;
