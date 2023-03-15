const userRepository = require("../repositories/user.repository");
const utility = require("../utils/utility");
const validationUtil = require("../utils/validation.util");


const getAllUser = () => {
  return userRepository.getAllUser();
};

const getUserByUsername = async (usernameParamData) => {
  const usernameParam = usernameParamData.toLowerCase();

  if (!usernameParam || !validationUtil.isAlphaNumeric(usernameParam)) {
    return { status: 400, message: "Invalid User in get request" };
  }

  const result = await userRepository.getUserByUsername(usernameParam);

  if (!result) {
    return {
      status: 404,
      message: `${usernameParam} is not found in database`,
    };
  } else {
    return result;
  }
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
  const updatedAt = utility.formatUnixTimestamp(Date.now());
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
  } else {
    return { status: 200, message: `${usernameParam} is successfully deleted` };
  }
};

module.exports = {
  getAllUser,
  getUserByUsername,
  updateUserPasswordByUsername,
  deleteUserByUsername
};
