const userRepository = require("../repositories/user.repository");
const commonUtil = require("../utils/common.util");
const validationUtil = require("../utils/validation.util");
const UserDTO = require("../DTO/user.dto");

const getAllUser = async (pageNumber,pageSize) => {
  const totalOffset = (parseInt(pageNumber)-1)*parseInt(pageSize);
  const totalLimit = parseInt(pageSize);
  const users = await userRepository.getAllUser(totalOffset,totalLimit);



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
        "New User's username contains space or special character",
    };
  }

  if (!validationUtil.validateEmail(email)) {
    return { status: 400, message: "New User's email is not valid" };
  }

  if (!validationUtil.checkPasswordLength(rawPassword)) {
    return { status: 400, message: "password is less than 6 digit" };
  }

  const password = await validationUtil.generateHashPassword(body.password);
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

const getUserByUsername = async (usernameParamData,fetchPassword=false) => {
  const usernameParam = usernameParamData.toLowerCase();

  if (!usernameParam || !validationUtil.isAlphaNumeric(usernameParam)) {
    return { status: 400, message: "Invalid User in get request" };
  }
  const user = await userRepository.getUserByUsername(usernameParam);


  if (!user) {
    return {
      status: 404,
      message: `${usernameParam} is not found in database`,
    };
  }
     if(fetchPassword){
      return user;
    }
      const dtoUser = new UserDTO(user);
      return dtoUser;
  
};

const updateUserPasswordByUsername = async (body, usernameParamData) => {
  const usernameParam = usernameParamData.toLowerCase();
  const rawPassword = body.password;

  if (!usernameParam || !validationUtil.isAlphaNumeric(usernameParam)) {
    return { status: 400, message: "Invalid User in put request" };
  }

  if (!rawPassword) {
    return { status: 400, message: "password Field is Empty" };
  }

  const result = await userRepository.getUserByUsername(usernameParam);
  if (!result) {
    return {
      status: 404,
      message: `${usernameParam} is not found in database`,
    };
  }

  if (!validationUtil.checkPasswordLength(rawPassword)) {
    return { status: 404, message: `password is less than 6 digit` };
  }

  const password = await validationUtil.generateHashPassword(body.password);
  const updatedAt = commonUtil.formatUnixTimestamp(Date.now());
  const isPasswordUpdated = userRepository.updateUserPasswordByUsername(
    password,
    updatedAt,
    usernameParam
  );
  if (isPasswordUpdated) {
    return { status: 200, message: `password is successfully updated` };
  }
};

const deleteUserByUsername = async (usernameParamData) => {
  const usernameParam = usernameParamData.toLowerCase();
  if (!usernameParam || !validationUtil.isAlphaNumeric(usernameParam)) {
    return { status: 400, message: "Invalid User in delete request" };
  }

  const result = await userRepository.getUserByUsername(usernameParam);

  if (!result) {
    return {
      status: 404,
      message: `${usernameParam} is not found in database`,
    };
  }

  const isUserDeleted = userRepository.deleteUserByUsername(usernameParam);
  if (!isUserDeleted) {
    return { status: 404, message: `Failed to Delete ${usernameParam}` };
  } 
    return { status: 200, message: `${usernameParam} is successfully deleted` };

};

module.exports = {
  getAllUser,
  createUser,
  getUserByUsername,
  updateUserPasswordByUsername,
  deleteUserByUsername
};
