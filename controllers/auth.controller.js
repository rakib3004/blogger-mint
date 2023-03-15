const authService = require("../services/auth.service");
require("dotenv").config();

const userRegistration = async (req, res) => {
  try {
    const userRegistrationData = await authService.userRegistration(req.body);

    if (userRegistrationData[1]) {
      res.cookie("jsontoken", userRegistrationData[1], { httpOnly: true });
      const registrationMessage = "Registration is successful";
      res.status(200).json(registrationMessage);
    } else {
      res.send({ status: 401, message: "Authentication Failed" });
    }
  } catch (err) {
    console.error(err);
    res.send({ status: 500, message: "Internal Server Error" });
  }
};

const userLogIn = async (req, res) => {
  try {
    const userLogInData = await authService.userLogIn(req.body);

    if (userLogInData[1]) {
      res.cookie("jsontoken", userLogInData[1], { httpOnly: true });
      const logInMessage = "Log In is successful";
      res.status(200).json(logInMessage);
    } else {
      res.send({ status: 401, message: "Authentication Failed" });
    }
  } catch (err) {
    console.error(err);
    res.send({ status: 500, message: "Internal Server Error" });
  }
};

module.exports = {
  userRegistration,
  userLogIn,
};
