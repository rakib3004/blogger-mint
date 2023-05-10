const Sequelize = require("sequelize");
// DATABASE_PORT=3307
// DATABASE_NAME=Blogger_wouldnails
// DATABASE_HOST=dh9.h.filess.io
// DATABASE_USER=Blogger_wouldnails
// DATABASE_PASSWORD=c850a25637693c0379e6822a41731c02e59270d4
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

  } catch (error) {
   
  }
})();

module.exports = sequelize;
