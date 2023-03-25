const bcrypt = require('bcrypt');

const isAlphaNumeric = (str) => {
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    return alphanumericRegex.test(str);
};

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const checkPasswordLength = (password) => {
    if (password.length >= 6) {
        return true;
    }
    return false;
};
const generateHashPassword = async (plainPassword) => {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(plainPassword, salt);
    return password;
};
module.exports = {
    isAlphaNumeric,
    validateEmail,
    checkPasswordLength,
    generateHashPassword,
};
