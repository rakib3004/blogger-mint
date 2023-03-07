const userController = require("../controllers/user.controller");

const express = require("express");
const router = express.Router();

const app = express();
app.use(express.static(__dirname + "/public"));

/*router.get('/', (req,res)=>{
    const userData=  [
        {
            "Id" : 1, 
            "Username": "turja",
            "Email": "simanta.deb@cefalo.com",
            "Password": "123456",
            "CreatedAt": "12-12-12",
            "UpdatedAt": "12-12-12"
        
        },
        
        {
            "Id" : 2, 
            "Username": "rakib",
            "Email": "rakib.trofder@cefalo.com",
            "Password": "cefalo123",
            "CreatedAt": "12-12-12",
            "UpdatedAt": "12-12-12"
        
        },
      ]      
    res.send(userData);
});*/
router
  .get("/", userController.getAllUser)
  .get("/:username", userController.getUser)
  .post("/", userController.createUser)
  .put("/:username", userController.updateUser)
  .delete("/:username", userController.deleteUser);

module.exports = router;
