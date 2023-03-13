const userController = require("../controllers/user.controller");

const express = require("express");
const router = express.Router();

const app = express();
app.use(express.static(__dirname + "/public"));

  router.route('/')
  .get(userController.getAllUser)
  .post(userController.createUser);

  router.route('/:username')
  .get(userController.getUserByUsername)
  .put(userController.updateUserPasswordByUsername)
  .delete(userController.deleteUserByUsername);

module.exports = router;
