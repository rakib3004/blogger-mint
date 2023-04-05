const express = require('express');
const userController = require('../controllers/user.controller');
const authenticationMiddleware = require('../middlewares/authentication.middleware');
const userAuthorizationMiddleware = require('../middlewares/user.authorization.middleware');

const router = express.Router();

router.route('/').get(userController.getAllUsers);

router
    .route('/:username')
    .get(userController.getUserByUsername)
    .put(authenticationMiddleware, userAuthorizationMiddleware, userController.updateUserPasswordByUsername)
    .delete(authenticationMiddleware, userAuthorizationMiddleware, userController.deleteUserByUsername);
module.exports = router;