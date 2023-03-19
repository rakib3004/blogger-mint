const userController = require("../controllers/user.controller");
const authenticationMiddleware = require("../middlewares/authentication.middleware");
const express = require("express");
const router = express.Router();

router.route("/").get(authenticationMiddleware,userController.getAllUser);

router
  .route("/:username")
  .get(authenticationMiddleware,userController.getUserByUsername)
  .put(authenticationMiddleware,userController.updateUserPasswordByUsername)
  .delete(authenticationMiddleware,userController.deleteUserByUsername);


module.exports = router;
