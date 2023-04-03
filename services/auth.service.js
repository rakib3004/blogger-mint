const authUtil = require("../utils/auth.util");
const userService = require("../services/user.service");
const { AppError } = require("../utils/error.handler.util");


const registerUser = async (body) => {

    const newUserResponse = await userService.createUser(body);

    const username = newUserResponse.user.username;
      const token = await authUtil.generateJwtToken(
        username
      );
      return { data: newUserResponse, token: token };
    };


const loginUser = async (body) => {
    const userResponse = await userService.getUserLoginInfo(body);

    const password = body.password;
    const user = userResponse;
    const storedHashPassword = user.password;
    const isValidPassword = await authUtil.comparePassword(
      password,
      storedHashPassword
    );

    if (isValidPassword) {
      const username = userResponse.username;
      const token = await authUtil.generateJwtToken(username);
      return token ;
    }
    throw new AppError('Authentication Failed', 401);

};

module.exports = {
  registerUser,
  loginUser,
};
