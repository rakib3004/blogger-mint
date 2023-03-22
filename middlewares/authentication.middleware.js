const jwt = require("jsonwebtoken");

const authenticationMiddleware = function (req, res, next) {
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
  } catch (err) {
    console.error(err)
    return res.status(401).send("JWT authorization failed");
  }
};

module.exports = authenticationMiddleware;
