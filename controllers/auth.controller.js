const authService = require("../services/auth.service");
require("dotenv").config();

const registerUser = async (req, res) => {
  if (!Object.keys(req.body).length) {
    return res.send({ status: 400, message: "Request body is empty" });
  }

  try {
     const response = await authService.registerUser(req.body);

    if (response.status==201) {
      res.cookie("jwt", response.message, { httpOnly: true });
      response.message = "Registration is successful";
    
    } 
    res.send(response);
    
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.send({ status: 409, message: err.parent.sqlMessage });
    }
      res.send({ status: 500,  message: "Internal Server Error" });
    
  }
};

const loginUser = async (req, res) => {
  if (!Object.keys(req.body).length) {
    return res.send({ status: 400, message: "Request body is empty" });
  }

  try {
   
    const response = await authService.loginUser(req.body);

   if (response.status==201) {
      res.cookie("jwt", response.message, { httpOnly: true });
      response.message = "Login is successful";
    } 
    res.send(response);
    
  } catch (err) {
    console.error(err);
    res.send({ status: 500, message: "Internal Server Error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
