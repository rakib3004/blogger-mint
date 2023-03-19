 const blogController = require("../controllers/blog.controller");
const checkLogin = require("../middlewares/auth.middleware");
const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(blogController.getAllBlogs) // only this can not check log in [middleware]
  .post(blogController.createBlog);

router
  .route("/:id")
  .get(blogController.getBlogByBlogId)
  .put(checkLogin,blogController.updateBlogByBlogId)
  .delete(checkLogin,blogController.deleteBlogByBlogId);






module.exports = router;
