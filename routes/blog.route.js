 const blogController = require("../controllers/blog.controller");
const authenticationMiddleware = require("../middlewares/authentication.middleware");
const authorizationMiddleware = require("../middlewares/authorization.middleware");

const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(blogController.getAllBlogs)
  .post(authenticationMiddleware,blogController.createBlog);

router
  .route("/:id")
  .get(blogController.getBlogByBlogId)
  .put(authenticationMiddleware,authorizationMiddleware,blogController.updateBlogByBlogId)
  .delete(authenticationMiddleware,authorizationMiddleware,blogController.deleteBlogByBlogId);

router
  .route("/author/:id")
  .get(blogController.getBlogByAuthorId);





module.exports = router;
