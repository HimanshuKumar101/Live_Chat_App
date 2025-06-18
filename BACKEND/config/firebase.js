// config/firebase.js

const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});
const realtimeDB = admin.database();

module.exports = {
  admin,
  realtimeDB
};
