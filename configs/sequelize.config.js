const Sequelize = require("sequelize");
const DATABASE_PORT = process.env.DATABASE_PORT
const DATABASE_NAME = process.env.DATABASE_NAME
const DATABASE_HOST = process.env.DATABASE_HOST
const DATABASE_USER = process.env.DATABASE_USER
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD

const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, {
  host: DATABASE_HOST,
  port : DATABASE_PORT,
  dialect: "mysql",
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    // console.log(DATABASE_HOST, DATABASE_PORT, DATABASE_USER, 'SUCCESSFUL');

  } catch (error) {
    // console.log(DATABASE_HOST, DATABASE_PORT, DATABASE_USER, 'FAILED');

  }
})();

module.exports = sequelize;
