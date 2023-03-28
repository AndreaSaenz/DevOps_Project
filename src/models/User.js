const { DataTypes } = require("sequelize");
const db = require("../database/config");

const User = db.define("user", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  userName: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  lastLogInDate: {
    type: DataTypes.DATE,
  },
  createdDate: {
    type: DataTypes.DATE,
  },
});

module.exports = User;
