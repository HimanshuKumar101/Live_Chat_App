const jwt = require("jsonwebtoken");
require("dotenv").config();

//auth
exports.Auth = async (req, res, next) => {
  try {
    //extract token
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");

    //if token missing, then return response
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    //verify the token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
     // console.log(decode);
      req.user = decode;
     

      return   next();
    } catch (error) {
      //verification issue
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};
