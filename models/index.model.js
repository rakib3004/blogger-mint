const User = require('./user.model');
const Blog = require('./blog.model');
const sequelize = require('../configs/sequelize.config');

User.hasMany(Blog, {
    foreignKey: 'authorId',
    onDelete: 'cascade',
    hooks: true,
});

Blog.belongsTo(User, { foreignKey: 'authorId' });

(async () => {
    await sequelize.sync({ force: false }); 
  })();
  
  module.exports = {
    User,
    Blog,
  };