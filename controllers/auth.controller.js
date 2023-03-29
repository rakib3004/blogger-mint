const authService = require("../services/auth.service");
require("dotenv").config();

const registerUser = async (req, res) => {
 
  try {
     const registerUserResponse = await authService.registerUser(req.body);

    if (registerUserResponse.status===201) {
      res.cookie("jwt", registerUserResponse.message, { httpOnly: true });
      registerUserResponse.message = "Registration is successful";
    } 
    return res.send(registerUserResponse);
    
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.send({ status: 409, message: err.parent.sqlMessage });
    }
    return res.send({ status: 500,  message: "Internal Server Error" });
    
  }
};

const loginUser = async (req, res) => {
 
  try {
   
    const loginUserResponse = await authService.loginUser(req.body);

   if (loginUserResponse.status===200) {
      res.cookie("jwt", loginUserResponse.message, { httpOnly: true });
      loginUserResponse.message = "Login is successful";
    } 
    return res.send(loginUserResponse.message);
    
  } catch (err) {
    console.error(err);
    return res.send({ status: 500, message: "Internal Server Error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
