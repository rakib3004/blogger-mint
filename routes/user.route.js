const userController = require("../controllers/user.controller");

const express = require("express");
const router = express.Router();

router.route("/").get(userController.getAllUser);

router
  .route("/:username")
  .get(userController.getUserByUsername)
  .put(userController.updateUserPasswordByUsername)
  .delete(userController.deleteUserByUsername);


module.exports = router;
