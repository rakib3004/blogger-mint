const userController = require("../controllers/user.controller");

const express = require("express");
const router = express.Router();


router.route("/register").post(userController.userRegistration);
router.route("/login").post(userController.userLogIn);

module.exports = router;
