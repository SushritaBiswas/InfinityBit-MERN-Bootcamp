const express = require("express");
const router = express.Router();
const verifyToken = require("../service/Authentication");

const {
  loginUser,
  createUser,
  getUsers,
  deleteUsers,
} = require("../controllers/UserController");

router.post("/login", loginUser); 
router.post("/users", verifyToken, createUser); 
router.get("/users",  getUsers); 
router.delete("/users/:id", verifyToken, deleteUsers);

module.exports = router;
