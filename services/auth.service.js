const authUtil = require("../utils/auth.util");
const userService = require("../services/user.service");
require("dotenv").config();

const registerUser = async (body) => {
  const newUserResponse = await userService.createUser(body);
  if (newUserResponse.status == 201) {
    const token = await authUtil.generateJwtToken(
      newUserResponse.message.username
    );


    return { status: 201, message: token };
  }
  return { status: newUserResponse.status, message: newUserResponse.message };
};

const loginUser = async (body) => {
  const userResponse = await userService.getUserLoginInfo(body);

  if (userResponse.status !== 200) {
    return { status: userResponse.status, message: userResponse.message };
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
  return { status: 401, message: "Authentication Failed" };
};

module.exports = {
  registerUser,
  loginUser,
};
