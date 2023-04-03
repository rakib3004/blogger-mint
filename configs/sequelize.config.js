const Sequelize = require("sequelize");
const sequelize = new Sequelize("blogger", "root", "", {
  host: "localhost",
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
