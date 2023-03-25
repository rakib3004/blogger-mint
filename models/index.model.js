const sequelize = require('../configs/sequelize.config');
const User = require('./user.model');
const Blog = require('./blog.model');

User.hasMany(Blog);
Blog.belongsTo(User);

sequelize
    .sync()
    .then(() => {
        console.log('Database tables synchronized successfully.');
    })
    .catch((err) => {
        console.error('Error synchronizing database tables:', err);
    });
