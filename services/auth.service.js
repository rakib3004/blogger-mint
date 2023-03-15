const userRepository = require("../repositories/user.repository");
const utility = require("../utils/utility");
const authUtil = require("../utils/auth.util");
const validationUtil = require("../utils/validation.util");
require("dotenv").config();

const registerUser = async (body) => {
  const id = utility.generateUUID();
  const username = body.username;
  const email = body.email;
  const rawPassword = body.password;

  if (!username) {
    return { status: 400, message: "username Field is Empty" };
  }

  if (!email) {
    return { status: 400, message: "email Field is Empty" };
  }

  if (!rawPassword) {
    return { status: 400, message: "password Field is Empty" };
  }

  if (!validationUtil.isAlphaNumeric(username)) {
    return {
      status: 401,
      message:
        "New User's username is  contains space or special character",
    };
  }

  if (!validationUtil.validateEmail(email)) {
    return { status: 400, message: "New User's email is not valid" };
  }

  if (!validationUtil.checkPasswordLength(rawPassword)) {
    return { status: 400, message: "password is less than 6 digit" };
  }

  const password = await validationUtil.generateHashPassword(body.password);
  const createdAt = utility.formatUnixTimestamp(Date.now());
  const updatedAt = utility.formatUnixTimestamp(Date.now());

  const newUser = await userRepository.createUser(
    id,
    username,
    email,
    password,
    createdAt,
    updatedAt
  );

  if (newUser) {
    const token = await authUtil.generateJwtToken(newUser.username);
    
    return {status: 201, message: token};
  } else {
    return null;
  }
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
      message:
        "New User's username is contains space or special character",
    };
  }

  if (!validationUtil.checkPassword(rawPassword)) {
    return { status: 400, message: "password is less than 6 digit" };
  }

  const password = body.password;

  const userData = await userRepository.getUserForLogIn(username);

  if (userData) {
    const isValidPassword = await authUtil.comparePassword(
      password,
      userData.password
    );

    if (isValidPassword) {
      const token = await authUtil.generateJwtToken(userData.username);
      return {status: 201, message: token};

    } else {
      return { status: 401, message: "Authentication Failed" };
    }
  } else {
    return "Authentication Failed!!";
  }
};

module.exports = {
  registerUser,
  loginUser,
};
