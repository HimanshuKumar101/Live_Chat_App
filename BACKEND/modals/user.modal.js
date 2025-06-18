const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    countryCode: {
      dialCode: {
        type: String,
        required: true,
        trim: true,
      },
      iso2Code: {
        type: String,
        trim: true,
      },
    },
    phoneno: {
      type: Number,
      required: true,
      trim: true,
      unique: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
