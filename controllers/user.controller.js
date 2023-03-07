const userService = require("../services/user.service");

exports.getUser = async (req, res) => {
  try {
    
    res.status(200).json(await userService.getUser(req));
  } catch (err) {
    console.error(err);
    res.send({ status: 500, message: err});
  }
};

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
    console.error(err);
    res.send({ status: 500, message: err });
  }
};

exports.updateUser = async (req, res) => {
  try {
    
    res.status(200).json(await userService.updateUser(req));
  } catch (err) {
    console.error(err);
    res.send({ status: 500, message: err });
  }
};

exports.deleteUser = async (req, res) => {
  try {
 
    res.status(200).json(await userService.deleteUser(req));
  } catch (err) {
    console.error(err);
    res.send({ status: 500, message: err });
  }
};
