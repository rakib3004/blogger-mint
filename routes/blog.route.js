const express = require('express');
const blogController = require('../controllers/blog.controller');
const authenticationMiddleware = require('../middlewares/authentication.middleware');
const blogAuthorizationMiddleware = require('../middlewares/blog.authorization.middleware');
const router = express.Router();


router.route('/').get(blogController.getAllBlogs).post(authenticationMiddleware, blogController.createBlog);

router
    .route('/:id')
    .get(blogController.getBlogById)
    .put(authenticationMiddleware, blogAuthorizationMiddleware, blogController.updateBlogById)
    .delete(authenticationMiddleware, blogAuthorizationMiddleware, blogController.deleteBlogById);

router.route('/author/:id').get(blogController.getBlogsByAuthorId);
router.route('/count').get(blogController.countAllBlogs);
router.route('/author/count/:id').get(blogController.countBlogsByAuthorId);
module.exports = router;