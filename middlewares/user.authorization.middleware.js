const userService = require('../services/user.service');

const userAuthorizationMiddleware = async (req, res, next) => {
    const { username } = req;
    const requestedUsername = String(req.params.username);
    try {
        const response = await userService.getUserByUsername(username);
        const currentUsername = String(response.user.username);
        if (currentUsername !== requestedUsername) {
            return res.send({
                status: 403,
                message: 'Access denied! You are not able to update/delete other user',
            });
        }
        return next();
    } catch (err) {
        return res.send({ status: 400, message: 'Authorization Failed!' });
    }
};

module.exports = userAuthorizationMiddleware;
