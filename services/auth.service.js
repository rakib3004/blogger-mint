"use strict";
const authRepository = require("../repositories/auth.repository");
const userUtils = require("../utils/user.utils");
const authUtils = require("../utils/auth.utils");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtUtil = require("../utils/jwt.util");

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
        "New User's username is null or contains space or special character",
    };
  }

  if (!userUtils.validateEmail(email)) {
    return { status: 401, message: "New User's email is not valid" };
  }

  if (!userUtils.checkPassword(rawPassword)) {
    return { status: 401, message: "password is less than 6 digit" };
  }

  const password = await userUtils.generateHashPassword(body.password);
  const createdAt = userUtils.formatUnixTimestamp(Date.now());
  const updatedAt = userUtils.formatUnixTimestamp(Date.now());

  const newUser = await authRepository.userRegistration(
    id,
    username,
    email,
    password,
    createdAt,
    updatedAt
  );

  if (newUser) {
    const token = jwtUtil.generateJwtToken(newUser.username);
    return token;
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
      status: 401,
      message:
        "New User's username is null or contains space or special character",
    };
  }

  if (!userUtils.checkPassword(rawPassword)) {
    return { status: 401, message: "password is less than 6 digit" };
  }

  const password = await userUtils.generateHashPassword(body.password);

  const userDetails = await authRepository.userLogIn(username);

  if (userDetails) {
    const isValidPassword = await authUtils.comparePassword(
      password,
      userDetails.password
    );
    if (isValidPassword) {
      const token = jwtUtil.generateJwtToken(userDetails.username);

      return token;
    } else {
      return null;
    }
  } else {
    return "Authentication Failed!!";
  }
};

module.exports = {
  userRegistration,
  userLogIn,
};
