const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("db_haupcar", "postgres", "kaninru28", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = sequelize;
