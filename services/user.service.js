const userRepository = require("../repositories/user.repository");
const { genSaltSync, hashSync } = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

function isAlphaNumeric(str) {
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  return alphanumericRegex.test(str);
}

function formatUnixTimestamp(timestamp) {
  const date = new Date(timestamp);
  /*const fullYear = String(date.getFullYear());
   const year = String(fullYear).slice(-2);*/
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

exports.getUser = (req) => {
  
  const username = req.params.username;
  console.log("Username in repository stage, get request "+username);

  if (username == null || !isAlphaNumeric(username)) {
    return { status: 402, message: "Invalid User in get request" };
  }

  return userRepository.getUser(username);
};

exports.getAllUser = (req) => {
  return userRepository.getAllUser(req);
};

exports.createUser = (req) => {
  const body = req.body;
  const salt = genSaltSync(10);
  const Id = uuidv4();
  const Username = body.Username;
  const Email = body.Email;
  const Password = hashSync(body.Password, salt);
  const CreatedAt = formatUnixTimestamp(Date.now());
  const UpdatedAt = formatUnixTimestamp(Date.now());

  const updatedUserData = [Id, Username, Email, Password, CreatedAt, UpdatedAt];
  return userRepository.createUser(updatedUserData);
};

exports.updateUser = (req) => {
  const username = req.params.username;
  if (username == "" || !isAlphaNumeric(username)) {
    return { status: 402, message: "Invalid User in update request" };
  }
  const body = req.body;
  const salt = genSaltSync(10);

  const Password = hashSync(body.Password, salt);
  const UpdatedAt = formatUnixTimestamp(Date.now());
  return userRepository.updateUser(Password, UpdatedAt,username);
};


exports.deleteUser = (req) => {
  const username = req.params.username;
  console.log("Username in repository stage, delete request"+username);
  if (username == "" || !isAlphaNumeric(username)) {
    return { status: 402, message: "Invalid User in delete request" };
  }

  return userRepository.deleteUser(username);
};
