const userService = require('../services/user.service');


async function getUser(req, res) {
    try {
        uid = req.body.id;
        if (uid == null) {
            res.send({ status: 402, message: "null user" });
            return;
        }
        res.json(await statusService.getUser(uid));
    } catch (err) {
        console.error(err);
        res.send({ status: 500, message: err });
    }
}


async function getAllUser(req, res) {
    try {
       
        res.json(await statusService.getUser());
    } catch (err) {
        console.error(err);
        res.send({ status: 500, message: err });
    }
}