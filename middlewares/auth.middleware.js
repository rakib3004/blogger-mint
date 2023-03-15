const jwt = require("jsonwebtoken");

const checkLogIn = function (req, res, next) {
  try {
    const accessToken = req.cookies.jsontoken;

    if (!accessToken) {
      return res.status(403).json({
        message: "jwt authorization failed",
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

module.exports = checkLogIn;
