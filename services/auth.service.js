"use strict";
const userRepository = require("../repositories/user.repository");
const userUtils = require("../utils/user.utils");
const authUtils = require("../utils/auth.utils");

const jwt = require("jsonwebtoken")


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

  /* const newUserData = [id, username, email, password, createdAt, updatedAt];*/
  const newUser = await userRepository.userRegistration(
    id,
    username,
    email,
    password,
    createdAt,
    updatedAt
  );

  if (newUser) {
    return {
      status: 201,
      message: `User: ${username} is successfully created`,
    };
  }
};

const userLogIn = async (body) => {
  const username = body.username;
  const rawPassword = body.password;
  console.log(username+""+rawPassword)

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


  const userDetails = await userRepository.userLogIn(
    username );

  if (userDetails) {
    const isValidPassword = authUtils.comparePassword(password,userDetails.password);

    if(isValidPassword){
      const token = jwt.sign({
        username: userDetails.username,
      }, process.env.JWT_SECRET_TOKEN, {
        expiresIn: process.env.JWT_SECRET_TOKEN_EXPIRE_TIME
      });

    const message = {
      access_token: token,
      message: "Login Successful"
    };
    return message;
    }
    else{
      return "Authentication Failed!!"
    }

  }
  else{
    return "Authentication Failed!!"

  }

};


module.exports = {
  userRegistration,
  userLogIn
};
