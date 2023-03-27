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
  .get(blogController.getBlogById)
  .put(authenticationMiddleware,authorizationMiddleware,blogController.updateBlogById)
  .delete(authenticationMiddleware,authorizationMiddleware,blogController.deleteBlogById);

router
  .route("/author/:id")
  .get(blogController.getBlogByAuthorId);





module.exports = router;
