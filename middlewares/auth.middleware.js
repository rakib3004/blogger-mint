const jwt = require("jsonwebtoken");

const checkLogin = function (req, res, next) {
  try {
    const accessToken = req.cookies.jwt;

    if (!accessToken) {
      return res.status(403).json({
        message: "JWT authorization failed",
      });
    }

    const payload = jwt.verify(accessToken, process.env.JWT_SECRET_TOKEN);

    const { username } = payload;
    req.username = username;

    next();
  } catch (e) {
    return res.status(401).send(e);
  }
};

module.exports = checkLogin;
