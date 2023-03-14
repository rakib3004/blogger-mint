const authService = require("../services/auth.service");
const jwt = require("jsonwebtoken")
require("dotenv").config();



const userRegistration = async(req,res)=>{

  try {
    const userRegistration = await authService.userRegistration(
      req.body
    );
    res.cookie("jwt", userRegistration.access_token, {secure: true, httpOnly: true});

    res.status(200).json(userRegistration);
  } catch (err) {
    console.error(err);
    res.send({ status: 500, message: "Internal Server Error" });
  }
  
}

const userLogIn = async(req,res)=>{

  try {
    const userLogIn = await authService.userLogIn(
      req.body
    );

    if(userLogIn){
      const token = jwt.sign({
        username: userLogIn.username,
      }, process.env.JWT_SECRET_TOKEN, {
        algorithm: process.env.JWT_SECRET_TOKEN_ALGORITHM,
        expiresIn: process.env.JWT_SECRET_TOKEN_EXPIRE_TIME
      });
      res.cookie("jwt", token, {secure: true, httpOnly: true});

    }

    res.status(200).json(userLogIn);
  } catch (err) {
    console.error(err);
    res.send({ status: 500, message: "Internal Server Error" });
  }
  
}

module.exports = {

  userRegistration,
  userLogIn
};
