const userController = require("../controllers/user.controller");
const checkLogin = require("../middlewares/auth.middleware");
const express = require("express");
const router = express.Router();

router.route("/").get(checkLogin,userController.getAllUser);

router
  .route("/:username")
  .get(checkLogin,userController.getUserByUsername)
  .put(checkLogin,userController.updateUserPasswordByUsername)
  .delete(checkLogin,userController.deleteUserByUsername);


module.exports = router;
