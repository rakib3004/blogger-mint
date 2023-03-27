const userService = require("../services/user.service");
const sendResponseInContentNegotiation = require("../utils/content-negotiation.util");


const getAllUser = async (req, res) => {
  try {

    let pageNumber = parseInt(req.query.page);
    let pageSize = parseInt(req.query.size);

    if(!req.query.page||pageNumber<0){
      pageNumber=1;
    }

    if(!req.query.size||pageSize<0){
      pageSize=3;
    }

    const getAllUserResponse = await userService.getAllUser(pageNumber,pageSize);
    const responseStatus = 200;
    const responseData = getAllUserResponse;
    sendResponseInContentNegotiation(req,res,responseStatus,responseData);
  } catch (err) {
    console.error(err);
    res.send({ status: 500, message: "Internal Server Error" });
  }
};

const getUserByUsername = async (req, res) => {
  try {
    if (!req.params.username) {
      res.send({ status: 400, message: "Request parameter is empty" });
    }

    const getUserByUsernameResponse = await userService.getUserByUsername(
      req.params.username
    );
    const responseStatus = 200;
    const responseData = getUserByUsernameResponse;
    sendResponseInContentNegotiation(req,res,responseStatus,responseData);  

  } catch (err) {
    console.error(err);
    res.send({ status: 500, message: "Internal Server Error" });
  }
};

const updateUserPasswordByUsername = async (req, res) => {
  if (!Object.keys(req.body).length) {
    return res.send({ status: 400, message: "Request body is empty" });
  }
  
  try {

    if (!req.params.username) {
      res.send({ status: 400, message: "Request parameter is empty" });
    }
    const updateUserPasswordByUsernameResponse =
      await userService.updateUserPasswordByUsername(
        req.body,
        req.params.username
      );
    res.status(200).json(updateUserPasswordByUsernameResponse);
  } catch (err) {
    console.error(err);
    res.send({ status: 500, message: "Internal Server Error" });
  }
};

const deleteUserByUsername = async (req, res) => {
  try {
    if (!req.params.username) {
      res.send({ status: 400, message: "Request parameter is empty" });
    }
    
    const deleteUserByUsernameResponse = await userService.deleteUserByUsername(
      req.params.username
    );
    res.status(200).json(deleteUserByUsernameResponse);
  } catch (err) {
    console.error(err);
    res.send({ status: 500, message: "Internal Server Error" });
  }
};

module.exports = {
  getAllUser,
  getUserByUsername,
  updateUserPasswordByUsername,
  deleteUserByUsername,
};
