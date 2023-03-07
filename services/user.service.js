const userRepository = require("../repositories/user.repository");
const  { genSaltSync, hashSync } = require("bcrypt");
const { v4: uuidv4 } = require('uuid');

function isAlphaNumeric(str) {
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  return alphanumericRegex.test(str);
}

exports.getUser = (req, res) => {
  
  const username = req.params;
    if (username == null||!isAlphaNumeric(username)) {
      return { status: 402, message: "Invalid User" };

    }

    return userRepository.getUser(username);

  };

  exports.getAllUser = (req, res) => {

    return userRepository.getAllUser(req);
  };

  exports.createUser = (req, res) => {

    const body = req.body;
    const salt = genSaltSync(10);

    const Id = uuidv4(); 
    const Username = body.Username;
    const Email = body.Email;
    const Password = hashSync(body.Password,salt);
    const CreatedAt = Date.now();
    const UpdatedAt = Date.now();

    const updatedUserData = [Id,Username,Email,Password,CreatedAt,UpdatedAt];
    return userRepository.createUser(updatedUserData);

  };

  exports.updateUser = (req, res) => {
    const username = req.params;
    if (username == ""||!isAlphaNumeric(username)) {
      return { status: 402, message: "Invalid User" };

    }

    const body = req.body;
    const salt = genSaltSync(10);

    const Username = body.Username;
    const Email = body.Email;
    const Password = hashSync(body.Password,salt);
    const UpdatedAt = Date.now();


    const updatedUserData = [Username,Email,Password,UpdatedAt];
    return userRepository.updateUser(updatedUserData,username);

  };

  exports.deleteUser = (req, res) => {
    const username = req.params;
    if (username == ""||!isAlphaNumeric(username)) {
      
      return { status: 402, message: "Invalid User" };
    }

    return userRepository.deleteUser(username);

  };


