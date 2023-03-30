const { DataTypes } = require("sequelize");
const db = require("../database/config");

const Fine = db.define(
  "multa",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    monto: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    observacion: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    folioSolicitud: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "fecha",
    updatedAt: false,
  }
);

Fine.sync();
module.exports = Fine;
