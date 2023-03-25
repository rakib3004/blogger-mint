const express = require('express');
const blogController = require('../controllers/blog.controller');
const authenticationMiddleware = require('../middlewares/authentication.middleware');
const blogAuthorizationMiddleware = require('../middlewares/blog.authorization.middleware');

const router = express.Router();

router.route('/').get(blogController.getAllBlogs).post(authenticationMiddleware, blogController.createBlog);

router
    .route('/:id')
    .get(blogController.getBlogByBlogId)
    .put(authenticationMiddleware, blogAuthorizationMiddleware, blogController.updateBlogByBlogId)
    .delete(authenticationMiddleware, blogAuthorizationMiddleware, blogController.deleteBlogByBlogId);

router.route('/author/:id').get(blogController.getBlogByAuthorId);

module.exports = router;
