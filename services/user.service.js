"use strict"
const userRepository = require("../repositories/user.repository");
const userUtils = require("../utils/user.utils");

const getAllUser = () => {
  return userRepository.getAllUser();
};

const createUser = async (body) => {
  
  

  const id = userUtils.generateUUID();
  const username = body.username;
  const email = body.email;
  const rawPassword = body.password;


  if(!username){
    return { status: 400, message: "username Field is Empty" };
  }

  if(!email){
    return { status: 400, message: "email Field is Empty" };
  }

  
  if(!rawPassword){
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

  const newUserData = [id, username, email, password, createdAt, updatedAt];

  
  const newUser = await userRepository.createUser(newUserData);

  if(newUser){
    return { status: 201, message: `User is successfully created`  };
  }
  
};

const getUserByUsername = async (usernameParamData) => {
  const usernameParam = usernameParamData.toLowerCase();

  if (!usernameParam || ! userUtils.isAlphaNumeric(usernameParam)) {
    return { status: 400, message: "Invalid User in get request" };
  }

  const result = await userRepository.getUserByUsername(usernameParam);

  if (!result.users.length) {
    return { status: 404, message: `${usernameParam} is not found in database` };
  } else {
    return result;
  }
};

const updateUserByUsername = async (body,usernameParamData) => {
  const usernameParam = usernameParamData.toLowerCase();
  const rawPassword = body.password;

  if (!usernameParam || !userUtils.isAlphaNumeric(usernameParam)) {
    return { status: 400, message: "Invalid User in put request" };
  }

  if(!rawPassword){
    return { status: 400, message: "password Field is Empty" };

  }

  const result = await userRepository.getUserByUsername(usernameParam);
  if (!result.users.length) {
    return { status: 404, message: `${usernameParam} is not found in database` };
  } 
  

  if (!userUtils.checkPassword(rawPassword)) {
    return { status: 404, message: `password is less than 6 digit` };
  }

  

  const password = await userUtils.generateHashPassword(body.password);
  const updatedAt = userUtils.formatUnixTimestamp(Date.now());
  const isPasswordUpdated =   userRepository.updateUserByUsername(password, updatedAt, usernameParam);
  if(isPasswordUpdated){
    return { status: 200, message: `password is successfully updated` };
  }

};

const deleteUserByUsername = async (usernameParamData) => {
  const usernameParam = usernameParamData.toLowerCase();
  if (!usernameParam  || !userUtils.isAlphaNumeric(usernameParam)) {
    return { status: 400, message: "Invalid User in delete request" };
  }

  const result = await userRepository.getUserByUsername(usernameParam);

  if (!result.users.length) {
    return { status: 404, message: `${usernameParam} is not found in database` };
  } 


  const isUserDeleted =  userRepository.deleteUserByUsername(usernameParam);
  if(!isUserDeleted){
    return { status: 404, message: `Failed to Delete ${usernameParam}` };
  }
  else{
    return { status: 200, message: `${usernameParam} is successfully deleted` };
  }

};

module.exports = {
  getAllUser,
  createUser,
  getUserByUsername,
  updateUserByUsername,
  deleteUserByUsername
  
};
