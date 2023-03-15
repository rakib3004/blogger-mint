const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const generateJwtToken = async (Username)=>{
  const token = jwt.sign({
      username: Username,
    }, process.env.JWT_SECRET_TOKEN, {
      algorithm: process.env.JWT_SECRET_TOKEN_ALGORITHM,
      expiresIn: process.env.JWT_SECRET_TOKEN_EXPIRE_TIME
    });
  return token;
}


const comparePassword = async (inputPassword,userPassword) => {
    const comparePasswordResult = await bcrypt.compare(inputPassword,userPassword);
    return comparePasswordResult;
  };

module.exports = {
  generateJwtToken,comparePassword
};
