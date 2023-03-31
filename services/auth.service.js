const authUtil = require("../utils/auth.util");
const userService = require("../services/user.service");
const { AppError } = require("../utils/error.handler.util");


const registerUser = async (body) => {

    const newUserResponse = await userService.createUser(body);

      const token = await authUtil.generateJwtToken(
        newUserResponse.username
      );
      return { data: newUserResponse, message: token };
    };

 


const loginUser = async (body) => {
    const userResponse = await userService.getUserLoginInfo(body);



    const password = body.password;
    const user = userResponse;

    const isValidPassword = await authUtil.comparePassword(
      password,
      user.password
    );

    if (isValidPassword) {
      const token = await authUtil.generateJwtToken(userResponse.username);
      return token ;
    }
    throw new AppError('Authentication Failed', 401);

 
};

module.exports = {
  registerUser,
  loginUser,
};
