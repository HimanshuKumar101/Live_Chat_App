const User = require("../modals/user.modal");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { realtimeDB } = require("../config/firebase");
require("dotenv").config();


//signup service

async function signup(userData) {
  const {
    name,
    email,
    password,
    phoneno,
    countryCode,
    profilePic = "",
    bio = ""
  } = userData;

  // Validate required fields
  if (!name || !email || !password || !phoneno || !countryCode?.dialCode ) {
    throw new Error("Missing required fields");
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user in MongoDB
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    phoneno,
    countryCode: {
      dialCode: countryCode.dialCode,
      iso2Code: "IN"
    },
    profilePic,
    bio,
  });

  // Push user to Firebase Realtime Database
  const ref = realtimeDB.ref("users/");
  const newUserRef = ref.push();

  await newUserRef.set({
    name: newUser.name,
    email: newUser.email,
    phoneno: newUser.phoneno,
    countryCode: newUser.countryCode,
    profilePic: newUser.profilePic,
    bio: newUser.bio,
    createdAt: new Date().toISOString(),
  });

  return {
    error: false,
    message: "User created successfully",
    result: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      phoneno: newUser.phoneno,
      countryCode: newUser.countryCode,
      profilePic: newUser.profilePic,
      bio: newUser.bio,
    },
  };
}

// Login service
async function login(email, password) {
  if (!email || !password) {
    throw new Error("Please provide email and password");
  }

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new Error("User does not exist");
  }

  const isPasswordValid = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const payload = {
    id: existingUser._id,
    email: existingUser.email,
    name: existingUser.name,
    phoneno: existingUser.phoneno,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return {
    error: false,
    message: "Login successful",
    result: {
      token,
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        phoneno: existingUser.phoneno,
      },
    },
  };
}

// Export services
module.exports = {
  signup,
  login,
};
