const jwt = require("jsonwebtoken");
const { AppError } = require("../utils/error.handler.util");

const authenticationMiddleware = function (req, res, next) {
  try {
    const accessToken = req.cookies.jwt;
    if (!accessToken) {
     throw new AppError('Please Login / Register',401);
    }
    const payload = jwt.verify(accessToken, process.env.JWT_SECRET_TOKEN);
    const  username  = payload.username;
    req.username = username;
    if(!username){
      throw new AppError('Authentication failed',400);

    }
    next();

  } catch (err) {
    next(err)
    //return res.status(400).send('Authentication failed 1103');
  }
};

module.exports = authenticationMiddleware;
