const User = require('./user.model');
const Blog = require('./blog.model');
User.hasMany(Blog, {
    foreignKey: 'authorId',
    onDelete: 'cascade',
    hooks: true,
});

Blog.belongsTo(User, { foreignKey: 'authorId' });

