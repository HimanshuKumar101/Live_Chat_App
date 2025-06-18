const express = require("express");
const { celebrate } = require("celebrate");

const router = express.Router();

const { login, signup, logout } = require("../controllers/auth.controller");
const { Auth } = require("../middleware/auth.middleware");

// Import validations
const { signupValidation, loginValidation } = require("../validations/auth.validation");

// Routes with validation
router.get("/login", celebrate(loginValidation), login);
router.post("/signup", celebrate(signupValidation), signup);
router.post("/logout", Auth, logout);


module.exports = router;
