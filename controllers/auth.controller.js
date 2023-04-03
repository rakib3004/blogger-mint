const authService = require("../services/auth.service");
const userValidationUtil = require("../utils/user.validation.util");
const { AppError } = require("../utils/error.handler.util");
const contentNegotiation = require("../utils/content-negotiation.util");


const registerUser = async (req, res, next) => {
 
  try {
    const ValidRegistration = userValidationUtil.checkValidRegistration(req.body);
    if (!ValidRegistration.valid) {
      throw new AppError(ValidRegistration.message, 400);
    }
    
     const registerUserResponse = await authService.registerUser(req.body);

      res.cookie("jwt", registerUserResponse.token, { httpOnly: true });

      const clientResponse = {data: registerUserResponse.data, message: "Registration is successful"}
     
     return contentNegotiation.sendResponseInContentNegotiation(req,res,201,clientResponse);
    
  } catch (err) {
    next(err);   
  }
};

const loginUser = async (req, res, next) => {

  try {
   const body = req.body;
    const validLogin = userValidationUtil.checkValidLogin(body);
    if (!validLogin.valid) {
      throw new AppError(validLogin.message,400);
    }

    const loginUserResponse = await authService.loginUser(req.body);
   
      res.cookie("jwt", loginUserResponse, { httpOnly: true }); 

      const clientResponse = {message: "Login is successful"};
      
      return contentNegotiation.sendResponseInContentNegotiation(req,res,200,clientResponse);
    
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
