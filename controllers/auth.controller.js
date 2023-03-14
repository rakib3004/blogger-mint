const authService = require("../services/auth.service");



const userRegistration = async(req,res)=>{

  try {
    const userRegistration = await authService.userRegistration(
      req.body
    );
    res.status(200).json(userRegistration);
  } catch (err) {
    console.error(err);
    res.send({ status: 500, message: "Internal Server Error" });
  }
  
}

const userLogIn = async(req,res)=>{

  try {
    const userLogIn = await authService.userLogIn(
      req.body
    );
    res.status(200).json(userLogIn);
  } catch (err) {
    console.error(err);
    res.send({ status: 500, message: "Internal Server Error" });
  }
  
}

module.exports = {

  userRegistration,
  userLogIn
};
