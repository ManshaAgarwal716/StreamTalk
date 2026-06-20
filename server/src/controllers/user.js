const bcrypt = require("bcrypt");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const {generateToken} = require("../utils/auth");
const signup = async (req, res) => {
      try {
   const { username, email, password } = req.body;
   if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please provide username, email, and password",
      });
    }
   const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
      
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = generateToken(user._id);
    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
    } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }
    try {
    const user = await User.findOne({ email }).select("+password");;

    if (!user) {
        return res.status(400).json({
        message: "Invalid email or password",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) { 
        return res.status(400).json({
        message: "Invalid email or password",
        });
    }
    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
    } catch (error) {
    res.status(500).json({  
        message: error.message,
    });
};}
module.exports = {
  signup,
  login,
};