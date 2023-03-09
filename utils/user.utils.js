const { genSalt, hash } = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

exports.isAlphaNumeric = (str) => {
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  return alphanumericRegex.test(str);
};

exports.validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

exports.checkPassword = (password) => {
  if (password.length >= 6) {
    return true;
  } else {
    return false;
  }
};

exports.formatUnixTimestamp = (timestamp) => {
  const date = new Date(timestamp);

  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

exports.generateHashPassword = async(plainPassword)=>{
    const salt = await genSalt(10);
    const password = await hash(plainPassword, salt);
    return password;
}

exports.generateUUID = ()=>{
    const id = uuidv4();
    return id;
}
  