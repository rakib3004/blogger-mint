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
      
      const saltValue = await bcrypt.genSalt(10);
      const hashpassword = await bcrypt.hash(plainPassword, saltValue);
      return hashpassword;
    }
    catch(err){
      throw err;
    }
   
  };


  module.exports = {
    isAlphaNumeric, validateEmail, checkPasswordLength, generateHashPassword
  };
  