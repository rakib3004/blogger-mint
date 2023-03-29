const userService = require("../services/user.service");
const sendResponseInContentNegotiation = require("../utils/content-negotiation.util");
const paginationUtil = require("../utils/pagination.util");


const getAllUsers = async (req, res, next) => {
  try {

    let pageNumber = paginationUtil.getPageNumber(req.query.page);
    let pageSize = paginationUtil.getPageSize(req.query.limit);
   
    const getAllUserResponse = await userService.getAllUsers(pageNumber,pageSize);
    const responseStatus = 200;
    const responseData = getAllUserResponse;
    sendResponseInContentNegotiation(req,res,responseStatus,responseData);
  } catch (err) {
    next(err);
  }
};

const getUserByUsername = async (req, res, next) => {
  try {
    const getUserByUsernameResponse = await userService.getUserByUsername(
      req.params.username
    );
    const responseStatus = 200;
    const responseData = getUserByUsernameResponse;
    sendResponseInContentNegotiation(req,res,responseStatus,responseData);  

  } catch (err) {
    next(err);
  }
};

const updateUserPasswordByUsername = async (req, res, next) => {
  
  try {
    const updateUserPasswordByUsernameResponse =
      await userService.updateUserPasswordByUsername(
        req.body,
        req.params.username
      );
    res.status(200).json(updateUserPasswordByUsernameResponse);
  } catch (err) {
    next(err);
  }
};

const deleteUserByUsername = async (req, res, next) => {
  try {
    const deleteUserByUsernameResponse = await userService.deleteUserByUsername(
      req.params.username
    );
    res.status(200).json(deleteUserByUsernameResponse);
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
