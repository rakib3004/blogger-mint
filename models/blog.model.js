const sequelize = require("../configs/sequelize.config");
const { DataTypes } = require("sequelize");
const uuid = require("uuid");

const Blog = sequelize.define("blogs", {
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuid.v4(),
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(60),
    allowNull: false,
    unique: true,
    validate: {
      is: /^[a-zA-Z0-9]{2,60}$/,
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Blog;
