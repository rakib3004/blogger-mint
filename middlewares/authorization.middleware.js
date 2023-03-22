const userService = require("../services/user.service");
const blogService = require("../services/blog.service");
const authorizationMiddleware = async (req, res, next) => {
  const username = req.username;
  const blogId = req.params.id;
  try {
    const response = await userService.getUserByUsername(username);
    const blog = await blogService.getBlogByBlogId(blogId);

    const userId = String(response.user.id);
    const authorId = String(blog[0].authorId);
    console.log("author-id "+authorId);
   console.log("user-id "+userId);
    if (authorId === userId) {
      next();
    }
   
 return res.send({
      status: 403,
      message: "Access denied! You are not author of this blog",
    });
   
  } catch (err) {
    return res.send({ status: 400, message: "Authorization Failed!" });
  }
};

module.exports = authorizationMiddleware;
