const { Sequelize } = require("sequelize");
//const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = require('../config');

const db = new Sequelize("devopsproyectdb", "newuser", "password", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;
