const authService = require("../services/auth.service");
require("dotenv").config();

const registerUser = async (req, res, next) => {
 
  try {
     const registerUserResponse = await authService.registerUser(req.body);

    if (registerUserResponse.status===201) {
      res.cookie("jwt", registerUserResponse.message, { httpOnly: true });
      registerUserResponse.message = "Registration is successful";
    } 
    return res.send(registerUserResponse);
    
  } catch (err) {
    next(err);   
  }
};

const loginUser = async (req, res, next) => {
 
  try {
   
    const loginUserResponse = await authService.loginUser(req.body);

   if (loginUserResponse.status===200) {
      res.cookie("jwt", loginUserResponse.message, { httpOnly: true });
      loginUserResponse.message = "Login is successful";
    } 
    return res.send(loginUserResponse.message);
    
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
