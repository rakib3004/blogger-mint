const userRepository = require("../repositories/user.repository");
const UserDTO = require("../DTO/user.dto");
const commonUtil = require("../utils/common.util");
const userValidationUtil = require("../utils/user.validation.util");
const paginationUtil = require("../utils/pagination.util");
const userNotFoundMessage = 'User not found';
const { AppError } = require("../utils/error.handler.util");


const getAllUsers = async (query) => {

    const pageNumber = paginationUtil.getPageNumber(query.page);
    const pageSize = paginationUtil.getPageSize(query.limit);
    const pageOffset = paginationUtil.getPageOffset(pageNumber, pageSize);
    const pageLimit = paginationUtil.getPageLimit(pageSize);

    const users = await userRepository.getAllUsers(pageOffset, pageLimit);
    const dtoUsers = [];
    users.forEach((user) => {
      const dtoUser = new UserDTO(user);
      dtoUsers.push(dtoUser);
    });
    return dtoUsers;

};

const createUser = async (body) => {
 
  const id = commonUtil.generateUUID();
  const username = body.username;
  const email = body.email;

  const password = await userValidationUtil.generateHashPassword(body.password);
  const createdAt = commonUtil.formatUnixTimestamp(Date.now());
  const updatedAt = commonUtil.formatUnixTimestamp(Date.now());

  const newUser = await userRepository.createUser(
    id,
    username,
    email,
    password,
    createdAt,
    updatedAt
  );

  const dtoUser = new UserDTO(newUser);
  console.log(dtoUser);
  return dtoUser;


};

const getUserByUsername = async (usernameParamData) => {
  const username = usernameParamData.toLowerCase();
  const validParameter = userValidationUtil.checkValidUsername(username);
  
  if (!validParameter.valid) {
    throw new AppError(validParameter.message, 400);
  }
  
  const userResponse = await userRepository.getUserByUsername(username);

  if (!userResponse) {
   throw new AppError(userNotFoundMessage,404);
  }

  const dtoUser = new UserDTO(userResponse);
  return dtoUser;

};

const getUserLoginInfo = async (body) => {

  const username = body.username.toLowerCase();
  const user = await userRepository.getUserByUsername(username);
  if (!user) {
    throw new AppError(userNotFoundMessage,404);

  }
  return user;

};

const updateUserPasswordByUsername = async (body, usernameParameter) => {
  const username = usernameParameter.toLowerCase();

  const password = await userValidationUtil.generateHashPassword(body.password);
  const updatedAt = commonUtil.formatUnixTimestamp(Date.now());
  const updatedUserResponse = userRepository.updateUserPasswordByUsername(
    password,
    updatedAt,
    username
  );

  return updatedUserResponse;
  
};

const deleteUserByUsername = async (usernameParamData) => {

  const username = usernameParamData.toLowerCase();
 
  const deletedUserResponse = userRepository.deleteUserByUsername(username);
  return deletedUserResponse;

};

module.exports = {
  getAllUsers,
  createUser,
  getUserByUsername,
  getUserLoginInfo,
  updateUserPasswordByUsername,
  deleteUserByUsername,
};
