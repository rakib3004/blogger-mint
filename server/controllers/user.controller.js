const userService = require('../services/user.service');


 exports.getUser  = (async (req, res) => {
    try {
        uid = req.body.id;
        if (uid == null) {
            res.send({ status: 402, message: "null user" });
            return;
        }
        res.json(await userService.getUser(uid));
    } catch (err) {
        console.error(err);
        res.send({ status: 500, message: err });
    }
});


exports.getAllUser = (async (req, res) => {
    try {
       
        res.json(await userService.getAllUser());
    } catch (err) {
        console.error(err);
        res.send({ status: 500, message: err });
    }
});

exports.createUser = (async (req, res) => {
   
    try {
        
        res.json(await userService.createUser());
    } catch (err) {
        console.error(err);
        res.send({ status: 500, message: err });
    }

});


exports.updateUser = (async (req, res) => {
   
    try {
        uid = req.body.id;
        if (uid == null) {
            res.send({ status: 402, message: "null user" });
            return;
        }
        res.json(await userService.updateUser(uid));
    } catch (err) {
        console.error(err);
        res.send({ status: 500, message: err });
    }

});

exports.deleteUser = (async (req, res) => {
   try {
        uid = req.body.id;
        if (uid == null) {
            res.send({ status: 402, message: "null user" });
            return;
        }
        res.json(await userService.deleteUser(uid));
    } catch (err) {
        console.error(err);
        res.send({ status: 500, message: err });
    }
});