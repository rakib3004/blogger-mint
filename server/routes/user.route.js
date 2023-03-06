const userConttoller = require('../controllers/user.controller');

const express = require('express');
const router = express.Router();


const app=express();
app.use(express.static(__dirname + '/public'));


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
router.get('/', userConttoller.getAllUser);
router.get('/:username', userConttoller.getUser);
router.post('/', userConttoller.createUser);
router.put('/:username', userConttoller.updateUser);
router.delete('/:username', userConttoller.deleteUser);

module.exports = router;