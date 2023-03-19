const jwt = require("jsonwebtoken");
const userService = require("../services/user.service");


const getAuthorId = async(req) =>{
  try {
    const accessToken = cookies.jsontoken;

    if (!accessToken) {
      return res.status(403).json({
        message: "JWT is Expired",
      });
    }

    const payload = jwt.verify(accessToken, process.env.JWT_SECRET_TOKEN);

    const { username } = payload;
    const userResponse = await userService.getUserByUsername(username);
    const authorId = userResponse.id;
    return authorId;


  } catch (e) {
    return res.status(401).send(e);
  }
};

module.exports = getAuthorId;