const userService = require("../services/user.service");
const sendResponseInContentNegotiation = require("../utils/content-negotiation.util");
const userValidationUtil = require("../utils/user.validation.util");
const { AppError } = require("../utils/error.handler.util");


const getAllUsers = async (req, res, next) => {
  try {
    const query = req.query;   
    const usersResponse = await userService.getAllUsers(query);
    return sendResponseInContentNegotiation(req,res,200,usersResponse);
  } catch (err) {
    next(err);
  }
};

const getUserByUsername = async (req, res, next) => {
  try {
    const username = req.params.username;
    const userResponse = await userService.getUserByUsername(
      username
    );
  
    return sendResponseInContentNegotiation(req,res,200,userResponse);  
  } catch (err) {
    next(err);
  }
};

const updateUserPasswordByUsername = async (req, res, next) => {
  try {
    const body = req.body;
    const username = req.params.username;
    const validUpdatedBody = userValidationUtil.checkValidPasswordBody(body);
    if (!validUpdatedBody.valid) {
      throw new AppError(validUpdatedBody.message,400);
    }

    const updatedUserResponse =
      await userService.updateUserPasswordByUsername(
        body,
        username
      );

      const clientResponse = {message: 'Password is successfully updated'};
      return sendResponseInContentNegotiation(req,res,200,clientResponse);
  } catch (err) {
    next(err);
  }
};

const deleteUserByUsername = async (req, res, next) => {
  try {
    const username = req.params.username;
    const deletedUserResponse = await userService.deleteUserByUsername(
      username
    );
    res.clearCookie("jwt");

    const clientResponse = {message: 'User is successfully deleted'};
    return sendResponseInContentNegotiation(req,res,200,clientResponse);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllUsers,
  getUserByUsername,
  updateUserPasswordByUsername,
  deleteUserByUsername,
};
