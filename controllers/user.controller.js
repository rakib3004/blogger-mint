const userService = require("../services/user.service");

const getAllUser = async (req, res) => {
  try {
    const getAllUserResponse = await userService.getAllUser();
    res.status(200).json(getAllUserResponse);
  } catch (err) {
    console.error(err);
    res.send({ status: 500, message: "Internal Server Error" });
  }
};

const createUser = async (req, res) => {
  try {
    const createUserResponse = await userService.createUser(req.body);
    res.status(201).json(createUserResponse);
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.send({ status: 409, message: err.parent.sqlMessage });
    } else if (err.code === "ECONNREFUSED") {
      res.send({ status: 500, message: "MYSQL/Apache Server is disconnected" });
    } else {
      res.send({ status: 500, message: err });
    }
  }
};

const getUserByUsername = async (req, res) => {
  try {
    const getUserByUsernameResponse = await userService.getUserByUsername(
      req.params.username
    );
    res.status(200).json(getUserByUsernameResponse);
  } catch (err) {
    console.error(err);
    res.send({ status: 500, message: "Internal Server Error" });
  }
};

const updateUserPasswordByUsername = async (req, res) => {
  try {
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
  createUser,
  getUserByUsername,
  updateUserPasswordByUsername,
  deleteUserByUsername,
};
