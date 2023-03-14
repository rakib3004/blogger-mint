const authService = require("../services/auth.service");
require("dotenv").config();



const userRegistration = async(req,res)=>{

  try {
    const userRegistration = await authService.userRegistration(
      req.body
    );
    res.cookie("jwt", userRegistration.access_token, {secure: true, httpOnly: true});
    console.log(userRegistration+"at auth controller");

    res.status(201).json(userRegistration);
  } catch (err) {
    console.error(err);
    res.send({ status: 500, message: "Internal Server Error" });
  }
  
}

const userLogIn = async(req,res)=>{

  try {
    const token = await authService.userLogIn(
      req.body
    );

    if(token){
      
      res.cookie("jwt", token, {secure: true, httpOnly: true});
      console.log(userRegistration+"at auth-controller/userLogin");

      res.status(200).json(token);

    }
    else{
      res.send({ status: 400, message: "Authentication Failed" });
    }

  } catch (err) {
    console.error(err);
    res.send({ status: 500, message: "Internal Server Error" });
  }
  
}

module.exports = {

  userRegistration,
  userLogIn
};
