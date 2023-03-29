const userRepository = require("../repositories/user.repository");
const UserDTO = require("../DTO/user.dto");
const commonUtil = require("../utils/common.util");
const userValidationUtil = require("../utils/user.validation.util");
const paginationUtil = require("../utils/pagination.util");
const userNotFoundMessage = 'User not found';

const getAllUsers = async (pageNumber, pageSize) => {
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
  const ValidRegistration = userValidationUtil.checkValidRegistration(body);
  if (!ValidRegistration.valid) {
    return { status: 400, message: ValidRegistration.message };
  }
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
  return { status: 201, message: newUser };
};

const getUserByUsername = async (usernameParamData) => {
  const username = usernameParamData.toLowerCase();

  const validParameter = userValidationUtil.checkValidUsername(username);
  
  if (!validParameter.valid) {
    return { status: 400, message: validParameter.message };
  }
  
 
  const userResponse = await userRepository.getUserByUsername(username);

  if (!userResponse) {
    return {
      status: 404,
      message: userNotFoundMessage,
    };
  }

  const dtoUser = new UserDTO(userResponse);
  return dtoUser;
};

const getUserLoginInfo = async (body) => {
  const validLogin = userValidationUtil.checkValidLogin(body);
  if (!validLogin.valid) {
    return { status: 400, message: validLogin.message };
  }

  const username = body.username.toLowerCase();

  const user = await userRepository.getUserByUsername(username);

  if (!user) {
    return {
      status: 404,
      message: `${username} is not a registered user`,
    };
  }
  return { status: 200, message: user };
};

const updateUserPasswordByUsername = async (body, usernameParameter) => {
  const username = usernameParameter.toLowerCase();

  const validPasswordAndParameter = userValidationUtil.checkValidPasswordAndParameter(body,username);
  
  if (!validPasswordAndParameter.valid) {
    return { status: 400, message: validPasswordAndParameter.message };
  }

  const userResponse = await userRepository.getUserByUsername(username);
  if (!userResponse) {
    return { status: 404, message: userNotFoundMessage };
  }

  const password = await userValidationUtil.generateHashPassword(body.password);
  const updatedAt = commonUtil.formatUnixTimestamp(Date.now());
  const updatedUserResponse = userRepository.updateUserPasswordByUsername(
    password,
    updatedAt,
    username
  );
  if (updatedUserResponse) {
    return { status: 200, message: `password is successfully updated` };
  }
};

const deleteUserByUsername = async (usernameParamData) => {
  const username = usernameParamData.toLowerCase();
 
  const validParameter = userValidationUtil.checkValidUsername(username);
  
  if (!validParameter.valid) {
    return { status: 400, message: validParameter.message };
  }

  const userResponse = await userRepository.getUserByUsername(username);

  if (!userResponse) {
    return {
      status: 404,
      message: userNotFoundMessage,
    };
  }

  const deletedUserResponse =
    userRepository.deleteUserByUsername(username);
 
  return { status: 200, message: `${username} is successfully deleted` };
};

module.exports = {
  getAllUsers,
  createUser,
  getUserByUsername,
  getUserLoginInfo,
  updateUserPasswordByUsername,
  deleteUserByUsername,
};
