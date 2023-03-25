const userService = require('../services/user.service');
const sendResponseInContentNegotiation = require('../utils/content-negotiation.util');

const getAllUser = async (req, res) => {
    try {
        const radixValue = 10;
        const defaultPageNumber = 1;
        const defaultPageSize = 3;
        const pageNumber =
            !req.query.page || req.query.page <= 0 ? defaultPageNumber : parseInt(req.query.page, radixValue);
        const pageSize =
            !req.query.limit || req.query.limit <= 0 ? defaultPageSize : parseInt(req.query.limit, radixValue);
        const getAllUserResponse = await userService.getAllUser(pageNumber, pageSize);
        const responseStatus = 200;
        const responseData = getAllUserResponse;
        sendResponseInContentNegotiation(req, res, responseStatus, responseData);
    } catch (err) {
        console.error(err);
        res.send({ status: 500, message: 'Internal Server Error' });
    }
};

const getUserByUsername = async (req, res) => {
    try {
        if (!req.params.username) {
            res.send({ status: 400, message: 'Request parameter is empty' });
        }

        const getUserByUsernameResponse = await userService.getUserByUsername(req.params.username);
        const responseStatus = 200;
        const responseData = getUserByUsernameResponse;
        return sendResponseInContentNegotiation(req, res, responseStatus, responseData);
    } catch (err) {
        console.error(err);
        return res.send({ status: 500, message: 'Internal Server Error' });
    }
};

const updateUserPasswordByUsername = async (req, res) => {
    try {
        if (JSON.stringify(req.body) === '{}') {
            return res.send({ status: 400, message: 'Request body is empty' });
        }

        if (!req.params.username) {
            return res.send({ status: 400, message: 'Request parameter is empty' });
        }
        const updateUserPasswordByUsernameResponse = await userService.updateUserPasswordByUsername(
            req.body,
            req.params.username
        );
        return res.status(200).json(updateUserPasswordByUsernameResponse);
    } catch (err) {
        console.error(err);
        return res.send({ status: 500, message: 'Internal Server Error' });
    }
};

const deleteUserByUsername = async (req, res) => {
    try {
        if (!req.params.username) {
            return res.send({ status: 400, message: 'Request parameter is empty' });
        }

        const deleteUserByUsernameResponse = await userService.deleteUserByUsername(req.params.username);
        return res.status(200).json(deleteUserByUsernameResponse);
    } catch (err) {
        console.error(err);
        return res.send({ status: 500, message: 'Internal Server Error' });
    }
};

module.exports = {
    getAllUser,
    getUserByUsername,
    updateUserPasswordByUsername,
    deleteUserByUsername,
};
