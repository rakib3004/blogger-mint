const userRepository = require("../repositories/user.repository");
const userUtils = require("../utils/user.util");
const authUtils = require("../utils/auth.util");
require("dotenv").config();

const userRegistration = async (body) => {
  const id = userUtils.generateUUID();
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

  if (!userUtils.isAlphaNumeric(username)) {
    return {
      status: 401,
      message:
        "New User's username is  contains space or special character",
    };
  }

  if (!userUtils.validateEmail(email)) {
    return { status: 400, message: "New User's email is not valid" };
  }

  if (!userUtils.checkPasswordLength(rawPassword)) {
    return { status: 400, message: "password is less than 6 digit" };
  }

  const password = await userUtils.generateHashPassword(body.password);
  const createdAt = userUtils.formatUnixTimestamp(Date.now());
  const updatedAt = userUtils.formatUnixTimestamp(Date.now());

  const newUser = await userRepository.createUser(
    id,
    username,
    email,
    password,
    createdAt,
    updatedAt
  );

  if (newUser) {
    const token = await authUtils.generateJwtToken(newUser.username);
    
    return {status: 201, message: token};
  } else {
    return null;
  }
};

const userLogIn = async (body) => {
  const username = body.username;
  const rawPassword = body.password;

  if (!username) {
    return { status: 400, message: "username Field is Empty" };
  }

  if (!rawPassword) {
    return { status: 400, message: "password Field is Empty" };
  }

  if (!userUtils.isAlphaNumeric(username)) {
    return {
      status: 400,
      message:
        "New User's username is contains space or special character",
    };
  }

  if (!userUtils.checkPassword(rawPassword)) {
    return { status: 400, message: "password is less than 6 digit" };
  }

  const password = body.password;

  const userData = await userRepository.getUserForLogIn(username);

  if (userData) {
    const isValidPassword = await authUtils.comparePassword(
      password,
      userData.password
    );

    if (isValidPassword) {
      const token = await authUtils.generateJwtToken(userData.username);
      return {status: 201, message: token};

    } else {
      return { status: 401, message: "Authentication Failed" };
    }
  } else {
    return "Authentication Failed!!";
  }
};

module.exports = {
  userRegistration,
  userLogIn,
};
