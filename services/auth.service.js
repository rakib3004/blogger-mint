const authUtil = require("../utils/auth.util");
const userService = require("../services/user.service");
require("dotenv").config();
const { AppError } = require("../utils/error.handler.util");


const registerUser = async (body) => {

    const newUserResponse = await userService.createUser(body);
    if (newUserResponse.status == 201) {
      const token = await authUtil.generateJwtToken(
        newUserResponse.message.username
      );
      return { status: 201, message: token };
    }
    throw new AppError(newUserResponse.message, newUserResponse.status);

 
};

const loginUser = async (body) => {
    const userResponse = await userService.getUserLoginInfo(body);

    if (userResponse.status !== 200) {
      throw new AppError(userResponse.message, userResponse.status);
    }

    const password = body.password;
    const user = userResponse.message;

    const isValidPassword = await authUtil.comparePassword(
      password,
      user.password
    );

    if (isValidPassword) {
      const token = await authUtil.generateJwtToken(userResponse.message.username);
      return { status: 200, message: token };
    }
    const authenticationFailureMessage = 'Authentication Failed';
    throw new AppError(authenticationFailureMessage, 401);

 
};

module.exports = {
  registerUser,
  loginUser,
};
