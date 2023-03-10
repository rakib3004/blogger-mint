
const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('users', {

    username: {
        type: DataTypes.STRING,
        noUpdate: true,
        allowNull: false,
        primaryKey: true,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    },
 
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    createdAt: {
        type: DataTypes.DATE,

    },
    updatedAt: {
        type: DataTypes.DATE,
        
    }
});

module.exports = User;
