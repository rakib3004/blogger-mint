const Sequelize = require('sequelize');
require('dotenv').config();
const DB_URI =  process.env.DB_URI;
const sequelize = new Sequelize('blogger', 'root', '', {
    host: 'localhost',
    dialect:  'mysql'
});


(async () => {
    try {
        await sequelize.authenticate();
  
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
    }
})();

module.exports = sequelize;

