const generateJwtToken = async (Username)=>{
    const token = jwt.sign({
        username: Username,
      }, process.env.JWT_SECRET_TOKEN, {
        algorithm: process.env.JWT_SECRET_TOKEN_ALGORITHM,
        expiresIn: process.env.JWT_SECRET_TOKEN_EXPIRE_TIME
      });
    return token;
}

module.exports = generateJwtToken;