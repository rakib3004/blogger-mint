const blogController = require("../controllers/blog.controller");
const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(blogController.getAllBlogs) // only this can not check log in [middleware]
  .post(blogController.createBlog);

router
  .route("/:id")
  .get(blogController.getBlogByBlogId)
  .put(blogController.updateBlogByBlogId)
  .delete(blogController.deleteBlogByBlogId);






module.exports = router;
