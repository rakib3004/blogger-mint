const authController = require("../controllers/auth.controller");

const express = require("express");
const router = express.Router();

router.route("/register").post(authController.userRegistration);
router.route("/login").post(authController.userLogIn);

module.exports = router;
