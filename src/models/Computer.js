const { DataTypes } = require('sequelize');
const db = require('../database/config');

const Computer = db.define('computadora', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    Name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    yearModel:{
        type: DataTypes.INTEGER,
        allowNull: false
    }, 
    memory:{
        type: DataTypes.INTEGER
    },
    monitorSize: {
        type: DataTypes.STRING(200)
    },
    ram: {
        type: DataTypes.INTEGER
    },
    processor: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
},
{
    freezeTableName: true
});

module.exports = Computer;