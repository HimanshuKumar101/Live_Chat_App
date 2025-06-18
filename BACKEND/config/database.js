// config/database.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


export const connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("DB connected successfully");
    })
    .catch((err) => {
      console.log("DB Connection ISSUES");
      console.error(err);
      process.exit(1);
    });
};
