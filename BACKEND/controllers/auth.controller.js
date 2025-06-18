const bcrypt = require("bcrypt");
const user = require("../modals/user.modal");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const authService = require("../services/auth.service");
const { token } = require("morgan");
require("dotenv").config();

// User Signup Controller
exports.signup = async (req, res) => {
  try {
    const user = await authService.signup({
      name: req.body.name,
      email: req.body.email,
      phoneno: req.body.phoneno,
      password: req.body.password,
      countryCode: req.body.countryCode,
      profilePic: req.body.profilePic || "",
      bio: req.body.bio || "",
      
    });

    res.status(200).json({
      error: user.error,
      message: user.message,
      data: user.result,
    });
  } catch (err) {
    res.status(400).json({ error: err.message, message: "Not able to signup" });
  }
};

// User Login Controller
exports.login = async (req, res) => {
  try {
    const user = await authService.login(req.body.email, req.body.password);

    if (user.error) {
      return res.status(400).json({ error: true, message: user.message });
    }

    //set cookies in controller
    res.cookie("token", user.result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      maxAge: 3600000, // 1 hour
      sameSite: "strict",
    });

    res.status(200).json({
      error: false,
      message: user.message,
      data: user.result.user,
      token: user.result.token,
    });
  } catch (err) {
    res.status(400).json({ error: err.message, message: "Not able to login" });
  }
};

exports.logout = async (req, res) => {
  try {
    // Clear the cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: "strict",
    });

    res.status(200).json({
      error: false,
      message: "User logged out successfully",
    });
  } catch (err) {
    res.status(400).json({ error: err.message, message: "Not able to logout" });
  }
};
