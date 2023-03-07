const userRepository = require("../repositories/user.repository");
const { genSaltSync, hashSync } = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

function isAlphaNumeric(str) {
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  return alphanumericRegex.test(str);
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function checkPassword(password) {
  if (password.length >= 6) {
    return true;
  } else {
    return false;
  }
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
  
  const username = String(req.params.username).toLowerCase();

  if (username == null || !isAlphaNumeric(username)) {
    return { status: 404, message: "Invalid User in get request" };
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
  const validPasswordCheck=body.Password;
  

  if (!isAlphaNumeric(Username)) {
    return { status: 401, message: "New User's username is null or contains space or special character" };
  }

  if (!validateEmail(Email)) {
    return { status: 401, message: "New User's email is not valid" };
  }
  
  if (!checkPassword(validPasswordCheck)) {
    return { status: 401, message: "Password is less than 6 digit" };
  }

  const Password = hashSync(body.Password, salt);
  const CreatedAt = formatUnixTimestamp(Date.now());
  const UpdatedAt = formatUnixTimestamp(Date.now());

  const updatedUserData = [Id, Username, Email, Password, CreatedAt, UpdatedAt];
  return userRepository.createUser(updatedUserData);
};

exports.updateUser = (req) => {
  const username = String(req.params.username).toLowerCase();
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
  const username = String(req.params.username).toLowerCase();
  if (username == "" || !isAlphaNumeric(username)) {
    return { status: 402, message: "Invalid User in delete request" };
  }

  return userRepository.deleteUser(username);
};
