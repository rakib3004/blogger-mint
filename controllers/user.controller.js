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
  getUserByUsername,
  updateUserPasswordByUsername,
  deleteUserByUsername
};
