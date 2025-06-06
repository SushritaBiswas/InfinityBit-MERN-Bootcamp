require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const blogRoutes = require("./src/routes/BlogRoutes");
const userRoutes = require("./src/routes/UserRoutes");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/blogDB";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection error:", err));

app.use("/", blogRoutes);
app.use("/", userRoutes);

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
