const { DataTypes } = require('sequelize');
const User = require('./user.model');
const uuid = require('uuid');
const sequelize = require('../configs/sequelize.config');
const Blog = sequelize.define('blogs', {
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuid.v4(),
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING(60),
        notNull: true,
        notEmpty: true,
    },
    description: {
        type: DataTypes.TEXT,
        notNull: true,
        notEmpty: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    authorId: {
        type: DataTypes.UUID,
        references: {
          model: User,
          key: 'id',
          onDelete: 'CASCADE'
        },
    }
});


(async () => {
    await Blog.sync({ force: false });
})();

module.exports = Blog;