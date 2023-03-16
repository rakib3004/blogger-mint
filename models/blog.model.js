const sequelize = require("../configs/sequelize.config");
const { DataTypes } = require("sequelize");
const uuid = require("uuid");

const Blog = sequelize.define("blogs", {
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuid.v4(),
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
});

Blog.sync({ force: false })
  .then(() => {
    console.log('New Blog Table is created');
  })
  .catch((error) => {
    console.error('Error syncing Blog table:', error);
  });

module.exports = Blog;
