const { DataTypes } = require('sequelize');
const db = require ('../database/config');

const User = db.define('alumno',{
    id:{
        type:DataTypes.INTEGER
    },
    nombre:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    telefono:{
        type:DataTypes.NUMBER
    },
    licenciatura:{
        type:DataTypes.STRING
    },
    semestre:{
        type:DataTypes.INTEGER
    },
})

module.exports = User;