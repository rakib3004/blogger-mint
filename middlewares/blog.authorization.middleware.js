const userService = require('../services/user.service');
const blogService = require('../services/blog.service');
const { AppError } = require("../utils/error.handler.util");

const blogAuthorizationMiddleware = async (req, res, next) => {
    const { username } = req;
    const blogId = req.params.id;
    try {
        const response = await userService.getUserByUsername(username);
        const blog = await blogService.getBlogById(blogId);
        const userId = String(response.user.id);
        const authorId = blog.authorId;
       

        if (authorId !== userId) {
         throw new AppError('Access denied! You are not author of this blog',403);
        }
        next();
    } catch (err) {
        next(err)

    }
};

module.exports = blogAuthorizationMiddleware;