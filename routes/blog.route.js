 const blogController = require("../controllers/blog.controller");
const authenticationMiddleware = require("../middlewares/authentication.middleware");
const authorizationMiddleware = require("../middlewares/authorization.middleware");

const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(blogController.getAllBlogs) // only this can not check log in [middleware]
  .post(authenticationMiddleware,blogController.createBlog);

router
  .route("/:id")
  .get(blogController.getBlogByBlogId)
  .put(authenticationMiddleware,authorizationMiddleware,blogController.updateBlogByBlogId)
  .delete(authenticationMiddleware,authorizationMiddleware,blogController.deleteBlogByBlogId);






module.exports = router;
