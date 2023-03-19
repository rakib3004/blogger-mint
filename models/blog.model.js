const sequelize = require("../configs/sequelize.config");
const { DataTypes } = require("sequelize");
const uuid = require("uuid");
const User = require("./user.model");


const Blog = sequelize.define("blogs", {
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuid.v4(),
    primaryKey: true,
  },

  title: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  authorId: {
    type: DataTypes.UUID,
    allowNull: false,
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




Blog.belongsTo(User, { foreignKey: "authorId" }); 
User.hasMany(Blog, { foreignKey: "authorId" }); 

  (async () => {
    await Blog.sync({ force: false }); 
  })();
  

module.exports = Blog;
