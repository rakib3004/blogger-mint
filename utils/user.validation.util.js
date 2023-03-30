const bcrypt = require("bcrypt");

const checkEmptyBody = (body) => {
  return !Object.keys(body).length ? true : false;
};

const isAlphaNumeric = (str) => {
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  return alphanumericRegex.test(str);
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const checkPasswordLength = (password) => {
  return password.length >= 6;
};

const generateHashPassword = async (plainPassword) => {
  try {
    const saltValue = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(plainPassword, saltValue);
    return hashpassword;
  } catch (err) {
    throw err;
  }
};

const checkValidUsername = (username) => {
  
  if (!username) {
    return { valid: false, message: "username field is empty" };
  }
  
  if (!isAlphaNumeric(username)) {
    return { valid: false, message: "username contains space or any special character" };
  }
  return { valid: true, message: "Ok" };

};


const checkValidPassword = (password) => {
  if (!password) {
    return { valid: false, message: "password field is empty" };
  }

  if (!checkPasswordLength(password)) {
    return { valid: false, message: `password is less than 6 digit` };
  }
  return { valid: true, message: "Ok" };

};

const checkValidPasswordAndParameter = (body,username) =>{
  if (checkEmptyBody(body)) {
    return { valid: false, message: "Request body is empty" };
  }

  if (!checkValidUsername(username).valid) {
    return { valid: false, message: checkValidUsername(username).message };
  }

  const password = body.password;
  if (!checkValidPassword(password).valid) {
    return { valid: false, message: checkValidPassword(password).message };
  }
  return { valid: true, message: "Ok" };

}

 

const checkValidRegistration = (body) => {
  if (checkEmptyBody(body)) {
    return { valid: false, message: "Request body is empty" };
  }
  const username = body.username.toLowerCase();
  const email = body.email;
  const password = body.password;

  if (!email) {
    return { valid: false, message: "email Field is Empty" };
  }

  if (!checkValidPassword(password).valid) {
    return { valid: false, message: checkValidPassword(password).message };
  }

  if (!checkValidUsername(username).valid) {
    return { valid: false, message: checkValidUsername(username).message };
  }

  if (!validateEmail(email)) {
    return { valid: false, message: "New User's email is not valid" };
  }

  return { valid: true, message: "Ok" };
};


const checkValidLogin = (body) => {
  if (checkEmptyBody(body)) {
    return { valid: false, message: "Request body is empty" };
  }

  const username = body.username;
  const password = body.password;

  if (!checkValidUsername(username).valid) {
    return { valid: false, message: checkValidUsername(username).message };
  }

  if (!checkValidPassword(password).valid) {
    return { valid: false, message: checkValidPassword(password).message };
  }
  return { valid: true, message: "Ok" };
};


module.exports = {
  checkEmptyBody,
  isAlphaNumeric,
  validateEmail,
  checkPasswordLength,
  generateHashPassword,
  checkValidUsername,
  checkValidPasswordAndParameter,
  checkValidRegistration,
  checkValidLogin,

};
