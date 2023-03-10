const userService = require("../services/user.service");

const getAllUser = async (req, res) => {
  try {
    const getAllUserResponse = await userService.getAllUser();
    res.status(200).json(getAllUserResponse);
  } catch (err) {
    console.error(err);
    res.send({ status: 500, message:  "Internal Server Error" });
  }
};

const createUser = async (req, res) => {
  try {
    

    const createUserResponse = await userService.createUser(req.body);
    res.status(201).json(createUserResponse);
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      res.send({ status: 409, message: err.sqlMessage });
    } else if (err.code === "ECONNREFUSED") {
      res.send({ status: 500, message: "MYSQL/Apache Server is disconnected" });
    } else {
      res.send({ status: 500, message: "Internal Server Error" });
    }
  }
};

const getUserByUserName = async (req, res) => {
  try {
    const getUserByUserNameResponse = await userService.getUserByUserName(req.params.username);
    res.status(200).json(getUserByUserNameResponse);
  } catch (err) {
    console.error(err);
    res.send({ status: 500, message:  "Internal Server Error" });
  }
};

const updateUserByUserName = async (req, res) => {
  try {

    const updateUserByUserNameResponse = await userService.updateUserByUserName(req.body,req.params.username);
    res.status(200).json(updateUserByUserNameResponse);
  } catch (err) {
    console.error(err);
    res.send({ status: 500, message:  "Internal Server Error" });
  }
};

const deleteUserByUserName = async (req, res) => {
  try {
    const deleteUserByUserNameResponse = await userService.deleteUserByUserName(req.params.username);
    res.status(200).json(deleteUserByUserNameResponse);
  } catch (err) {
    console.error(err);
    res.send({ status: 500, message:  "Internal Server Error" });
  }
};


module.exports = {
  getAllUser,
  createUser,
  getUserByUserName,
  updateUserByUserName,
  deleteUserByUserName
};
