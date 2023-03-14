const userController = require("../controllers/user.controller");
const checkLogIn = require("../middlewares/auth.middleware");
const express = require("express");
const router = express.Router();

router.route("/").get(checkLogIn,userController.getAllUser);

router
  .route("/:username")
  .get(checkLogIn,userController.getUserByUsername)
  .put(checkLogIn,userController.updateUserPasswordByUsername)
  .delete(checkLogIn,userController.deleteUserByUsername);


module.exports = router;
