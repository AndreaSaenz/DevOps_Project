const { DataTypes } = require("sequelize");
const db = require("../database/config");

const User = db.define(
  "users",
  {
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
    token: {
      type: DataTypes.STRING(255),
    },
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: "lastLogIn",
  }
);

User.sync();
module.exports = User;
