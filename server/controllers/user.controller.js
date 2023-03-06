const userService = require('../services/user.service');


async function getUser(req, res) {
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
}


async function getAllUser(req, res) {
    try {
       
        res.json(await userService.getAllUser());
    } catch (err) {
        console.error(err);
        res.send({ status: 500, message: err });
    }
}

async function createUser(req, res) {
   
    try {
        
        res.json(await userService.createUser());
    } catch (err) {
        console.error(err);
        res.send({ status: 500, message: err });
    }

}


async function updateUser(req, res) {
   
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

}

async function deleteUser(req, res) {
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
}