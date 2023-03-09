"use strict"
const userRepository = require("../repositories/user.repository");
const { genSalt, hash } = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

function isAlphaNumeric(str) {
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  return alphanumericRegex.test(str);
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function checkPassword(password) {
  if (password.length >= 6) {
    return true;
  } else {
    return false;
  }
}

function formatUnixTimestamp(timestamp) {
  const date = new Date(timestamp);

  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

exports.getAllUser = () => {
  return userRepository.getAllUser();
};

exports.createUser = async (req) => {
  const body = req.body;
  const salt = await genSalt(10);
  const id = uuidv4();
  const username = body.username;
  const email = body.email;
  const validPasswordCheck = body.password;


  if(!username){
    return { status: 400, message: "username Field is Empty" };
  }

  if(!email){
    return { status: 400, message: "email Field is Empty" };
  }



  if (!isAlphaNumeric(username)) {
    return {
      status: 401,
      message:
        "New User's username is null or contains space or special character",
    };
  }

  if (!validateEmail(email)) {
    return { status: 401, message: "New User's email is not valid" };
  }

  if (!checkPassword(validPasswordCheck)) {
    return { status: 401, message: "password is less than 6 digit" };
  }

  const password = await hash(body.password, salt);
  const createdAt = formatUnixTimestamp(Date.now());
  const updatedAt = formatUnixTimestamp(Date.now());

  const newUserData = [id, username, email, password, createdAt, updatedAt];

  
  const newUser = await userRepository.createUser(newUserData);

  if(newUser){
    return { status: 201, message: `User is successfully created`  };
  }
  
};

exports.getUserByUserName = async (req) => {
  const usernameParam = String(req.params.username).toLowerCase();

  if (!usernameParam || !isAlphaNumeric(usernameParam)) {
    return { status: 400, message: "Invalid User in get request" };
  }

  const result = await userRepository.getUserByUserName(usernameParam);

  if (!result.users.length) {
    return { status: 404, message: `${usernameParam} is not found in database` };
  } else {
    return result;
  }
};

exports.updateUserByUserName = async (req) => {
  const usernameParam = String(req.params.username).toLowerCase();
  if (!usernameParam || !isAlphaNumeric(usernameParam)) {
    return { status: 400, message: "Invalid User in put request" };
  }

  const result = await userRepository.getUserByUserName(usernameParam);
  if (!result.users.length) {
    return { status: 404, message: `${usernameParam} is not found in database` };
  } 

  
  const body = req.body;
  const salt = await genSalt(10)


  const validPasswordCheck = body.password;
  if (!checkPassword(validPasswordCheck)) {
    return { status: 404, message: `password is less than 6 digit` };
  }

  const password = await hash(body.password, salt);
  const updatedAt = formatUnixTimestamp(Date.now());
  const isPasswordUpdated =   userRepository.updateUserByUserName(password, updatedAt, usernameParam);
  if(isPasswordUpdated){
    return { status: 200, message: `password is successfully updated` };
  }

};

exports.deleteUserByUserName = async (req) => {
  const usernameParam = String(req.params.username).toLowerCase();
  if (!usernameParam  || !isAlphaNumeric(usernameParam)) {
    return { status: 400, message: "Invalid User in delete request" };
  }

  const result = await userRepository.getUserByUserName(usernameParam);

  if (!result.users.length) {
    return { status: 404, message: `${usernameParam} is not found in database` };
  } 


  const isUserDeleted =  userRepository.deleteUserByUserName(usernameParam);
  if(!isUserDeleted){
    return { status: 404, message: `Failed to Delete ${usernameParam}` };
  }
  else{
    return { status: 200, message: `${usernameParam} is successfully deleted` };
  }

};
