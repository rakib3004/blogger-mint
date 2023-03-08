const userService = require("../services/user.service");

exports.getAllUser = async (req, res) => {
  try {
    res.status(200).json(await userService.getAllUser());
  } catch (err) {
    console.error(err);
    res.send({ status: 500, message: err });
  }
};

exports.createUser = async (req, res) => {
  try {
    res.status(200).json(await userService.createUser(req));
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      res.send({ status: 409, message: err.sqlMessage });
    } else if (err.code === "ECONNREFUSED") {
      res.send({ status: 500, message: "MYSQL/Apache Server is disconnected" });
    } else {
      res.send({ status: 500, message: err });
    }
  }
};

exports.getUserByUserName = async (req, res) => {
  try {
    res.status(200).json(await userService.getUserByUserName(req));
  } catch (err) {
    console.error(err);
    res.send({ status: 500, message: err });
  }
};

exports.updateUserByUserName = async (req, res) => {
  try {
    res.status(200).json(await userService.updateUserByUserName(req));
  } catch (err) {
    console.error(err);
    res.send({ status: 500, message: err });
  }
};

exports.deleteUserByUserName = async (req, res) => {
  try {
    res.status(200).json(await userService.deleteUserByUserName(req));
  } catch (err) {
    console.error(err);
    res.send({ status: 500, message: err });
  }
};
