const authUtil = require("../utils/auth.util");
const validationUtil = require("../utils/validation.util");
const userService = require("../services/user.service");
require("dotenv").config();

const registerUser = async (body) => {
  const response = await userService.createUser(body);
  if (response.status==201) {

    const token = await authUtil.generateJwtToken(response.message.username);
    
    return {status: 201, message: token};
  } 
    return {status: response.status, message: response.message};

};

const loginUser = async (body) => {
  const username = body.username;
  const rawPassword = body.password;

  if (!username) {
    return { status: 400, message: "username Field is Empty" };
  }

  if (!rawPassword) {
    return { status: 400, message: "password Field is Empty" };
  }

  if (!validationUtil.isAlphaNumeric(username)) {
    return {
      status: 400,
      message: "New User's username is contains space or special character",
    };
  }

  if (!validationUtil.checkPasswordLength(rawPassword)) {
    return { status: 400, message: "password is less than 6 digit" };
  }
  const password = body.password;
  const fetchPassword=true;
  const response = await userService.getUserByUsername(username,fetchPassword);
   
  if (response.status===404) {
    return { status: 404, message: `${username} is not a registered user` };
    }
    const isValidPassword = await authUtil.comparePassword(
      password,
      response.password
    )
    

    if (isValidPassword) {
      const token = await authUtil.generateJwtToken(response.username);
      return {status: 201, message: token};
    } 
      return { status: 401, message: "Authentication Failed" };
    
 
};

module.exports = {
  registerUser,
  loginUser,
};
