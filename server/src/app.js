const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const authRoutes = require("./routes/authroute");
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.json({ message: "StreamTalk API is running" });
});

module.exports = app;