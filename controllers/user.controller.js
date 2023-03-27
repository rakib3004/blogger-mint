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
    if (!req.params.username) {
      res.send({ status: 400, message: "Request parameter is empty" });
    }

    const getUserByUsernameResponse = await userService.getUserByUsername(
      req.params.username
    );
    if(!getUserByUsernameResponse){
      res.send({status: 404, message: `${req.params.username} is not found in database`});
    }
    else{
    res.send({status: getUserByUsernameResponse.status, message: getUserByUsernameResponse.message});

    }
    

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
