const authUtil = require("../utils/auth.util");
const validationUtil = require("../utils/validation.util");
const userService = require("../services/user.service");
require("dotenv").config();

const registerUser = async (body) => {
  const newUserResponse = await userService.createUser(body);
  if (newUserResponse.status==201) {

    const token = await authUtil.generateJwtToken(newUserResponse.message.username);
    
    return {status: 201, message: token};
  } 
    return {status: newUserResponse.status, message: newUserResponse.message};

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
  const getUserResponse = await userService.getUserLoginInfo(username);
   
  if (getUserResponse.status===404) {
    return { status: 404, message: `${username} is not a registered user` };
    }
    const isValidPassword = await authUtil.comparePassword(
      password,
      getUserResponse.password
    )
    

    if (isValidPassword) {
      const token = await authUtil.generateJwtToken(getUserResponse.username);
      return {status: 200, message: token};
    } 
      return { status: 401, message: "Authentication Failed" };
    
 
};

module.exports = {
  registerUser,
  loginUser,
};
