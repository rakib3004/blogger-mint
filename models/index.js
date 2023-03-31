const sequelize = require('../configs/sequelize.config');
const Blog = require('./blog.model');
const User = require('./user.model');


Blog.belongsTo(User, { foreignKey: 'authorId' });

User.hasMany(Blog, {
    foreignKey: 'authorId',
    onDelete: 'cascade',
    hooks: true,
});


(async () => {
    await sequelize.sync({ force: false }); 
  })();

module.exports = {
    User, Blog
}
  
 