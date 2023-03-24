const User = require('../models/user.model');

const getAllUser = async (pageOffset, pageLimit) => {
    try {
        const users = await User.findAll({
            offset: pageOffset,
            limit: pageLimit,
            order: [['createdAt', 'DESC']],
        });
        return users;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const createUser = async (id, username, email, password, createdAt, updatedAt) => {
    try {
        const user = await User.create({
            id,
            username,
            email,
            password,
            createdAt,
            updatedAt,
        });
        return user;
    } catch (error) {
        throw error;
    }
};

const getUserByUsername = async (username) => {
    try {
        const user = await User.findOne({
            where: {
                username,
            },
        });
        if (user) {
            return user;
        }
        return null;
    } catch (error) {
        throw error;
    }
};

const updateUserPasswordByUsername = async (username, newPassword) => {
    try {
        const user = await User.update({ password: newPassword }, { where: { username } });
        return user;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const deleteUserByUsername = async (username) => {
    try {
        const user = await User.findOne({
            where: {
                username,
            },
        });
        if (user) {
            await user.destroy();
            return true;
        }
        return null;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = {
    getAllUser,
    createUser,
    getUserByUsername,
    updateUserPasswordByUsername,
    deleteUserByUsername,
};
