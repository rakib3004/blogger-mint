const authService = require('../services/auth.service');
require('dotenv').config();

const registerUser = async (req, res) => {
    if (!Object.keys(req.body).length) {
        return res.send({ status: 400, message: 'Request body is empty' });
    }

    try {
        const response = await authService.registerUser(req.body);

        if (response.status === 201) {
            res.cookie('jwt', response.message, { httpOnly: true });
            response.message = 'Registration is successful';
            return res.send(response.message);
        }

        response.message = 'Registration is unsuccessful';
        return res.send(response.message);
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            return res.send({ status: 409, message: err.parent.sqlMessage });
        }
        return res.send({ status: 500, message: 'Internal Server Error' });
    }
};

const loginUser = async (req, res) => {
    if (!Object.keys(req.body).length) {
        return res.send({ status: 400, message: 'Request body is empty' });
    }

    try {
        const response = await authService.loginUser(req.body);

        if (response.status === 201) {
            res.cookie('jwt', response.message, { httpOnly: true });
            response.message = 'Login is successful';
            return res.send(response.message);
        }
        response.message = 'Login is unsuccessful';
        return res.send(response.message);
    } catch (err) {
        console.error(err);
        return res.send({ status: 500, message: 'Internal Server Error' });
    }
};

module.exports = {
    registerUser,
    loginUser,
};
