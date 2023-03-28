const bcrypt = require("bcrypt");

const isAlphaNumeric = (str) => {
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    return alphanumericRegex.test(str);
  };
  
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
const checkPasswordLength = (password) => {
  return (password.length >= 6);


  };
  const generateHashPassword = async (plainPassword) => {
    try{
      const salt = await bcrypt.genSalt(10);
      const Hashpassword = await bcrypt.hash(plainPassword, salt);
      return Hashpassword;
    }
    catch(err){
      throw err;
    }
   
  };


  module.exports = {
    isAlphaNumeric, validateEmail, checkPasswordLength, generateHashPassword
  };
  