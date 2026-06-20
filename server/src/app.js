const express = require("express");
const cors = require("cors");
const messageRoutes = require(
  "./routes/messageRoutes"
);
const app = express();
const authRoutes = require("./routes/authroute");
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.json({ message: "StreamTalk API is running" });
});
app.use("/api/messages", messageRoutes);
module.exports = app;