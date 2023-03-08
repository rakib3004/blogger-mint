const userController = require("../controllers/user.controller");
const express = require("express");
const router = express.Router();

const app = express();
app.use(express.static(__dirname + "/public"));


  router.route('/')
  .get(userController.getAllUser)
  .post(userController.createUser);

  router.route('/:username')
  .get(userController.getUserByUserName)
  .put(userController.updateUserByUserName)
  .delete(userController.deleteUserByUserName);

module.exports = router;
