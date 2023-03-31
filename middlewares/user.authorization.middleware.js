const userService = require('../services/user.service');
const { AppError } = require("../utils/error.handler.util");
const userValidationUtil = require("../utils/user.validation.util");
const userAuthorizationMiddleware = async (req, res, next) => {
    const { username } = req;
    const requestedUsername = String(req.params.username).toLowerCase();
    try {
        const validUsername = userValidationUtil.checkValidUsername(requestedUsername);
    if (!validUsername.valid) {
      throw new AppError(validUsername.message,400);
    }

        const response = await userService.getUserByUsername(username);
        const currentUsername = response.user.username;
        if (currentUsername !== requestedUsername) {
            throw new AppError('Access denied! You are not able to update/delete other user',403);
        }
         next();
    } catch (err) {
        next(err)

    }
};

module.exports = userAuthorizationMiddleware;