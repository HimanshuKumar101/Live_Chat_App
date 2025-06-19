
const express = require("express");
const cors = require("cors"); 
const route = require("../BACKEND/routes/user.route.js");
const cookieParser = require("cookie-parser");
const { errors } = require("celebrate");
const errorHandler = require("./validations/validate.js");
const routes = require("./routes/user.route.js");
const connect = require("./config/database.js").connect;

const app = express();

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connect();

app.get("/", (req, res) => {
  res.send("Backend API running!");
});

app.use("/api/auth", routes);

app.use(errorHandler.handleError());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
