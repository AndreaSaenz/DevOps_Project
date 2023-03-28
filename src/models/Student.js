const { DataTypes } = require('sequelize');
const db = require('../database/config');

const Student = db.define('alumno', {
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
    email:{
        type: DataTypes.STRING(100),
        allowNull: false
    }, 
    telefono:{
        type: DataTypes.STRING(15)
    },
    licenciatura: {
        type: DataTypes.STRING(200)
    },
    semestre: {
        type: DataTypes.INTEGER
    }
});

module.exports = Student;