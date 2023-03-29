const bcrypt = require("bcrypt");


const validateUserRegistrationInfo= (body)=>{
 
}
const validateLoginInfo= (body)=>{
  
}
const validateUpdatedUserInfo= (body)=>{
  
}
const validateDeletedUserInfo= (body)=>{
  
}

const validateCreatedBlogInfo= (body)=>{
  
}

const validateDeletedBlogInfo= (body)=>{
  
}



const isRequestBodyEmpty = (body)=>{
  if (!Object.keys(body).length) {
    return { valid: false, message: "Request body is empty"};
  }
}

const isRequestParameterEmpty = (param)=>{
  return (!param) ? false: true;
}

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
    isAlphaNumeric, validateEmail, checkPasswordLength, generateHashPassword,isRequestBodyEmpty,isRequestParameterEmpty
  };
  