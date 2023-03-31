const userService = require("../services/user.service");
const sendResponseInContentNegotiation = require("../utils/content-negotiation.util");
const userValidationUtil = require("../utils/user.validation.util");
const { AppError } = require("../utils/error.handler.util");


const getAllUsers = async (req, res, next) => {
  try {
    const query = req.query;   
    const getAllUserResponse = await userService.getAllUsers(query);
    sendResponseInContentNegotiation(req,res,200,getAllUserResponse);
  } catch (err) {
    console.error(err);  next(err);
  }
};

const getUserByUsername = async (req, res, next) => {
  try {
    const username = req.params.username;
    const getUserByUsernameResponse = await userService.getUserByUsername(
      username
    );
    const responseStatus = 200;
    const responseData = getUserByUsernameResponse;
    sendResponseInContentNegotiation(req,res,responseStatus,respvalidUpdatedBodyonseData);  

  } catch (err) {
    console.error(err);  next(err);
  }
};

const updateUserPasswordByUsername = async (req, res, next) => {
  try {
    const body = req.body;
    const username = req.params.username;
    const validUpdatedBody = userValidationUtil.checkValidUpdatedBody(body);
    if (!validUpdatedBody.valid) {
      throw new AppError(validUpdatedBody.message,400);
    }

    const updatedUserResponse =
      await userService.updateUserPasswordByUsername(
        body,
        username
      );
    res.status(200).json(updatedUserResponse);
  } catch (err) {
    console.error(err);  next(err);
  }
};

const deleteUserByUsername = async (req, res, next) => {
  try {
    const username = req.params.username;
    const deleteUserByUsernameResponse = await userService.deleteUserByUsername(
      username
    );
    res.status(200).json(deleteUserByUsernameResponse);
  } catch (err) {
    console.error(err);  next(err);
  }
};

module.exports = {
  getAllUsers,
  getUserByUsername,
  updateUserPasswordByUsername,
  deleteUserByUsername,
};
