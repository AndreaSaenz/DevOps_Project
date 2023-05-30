const { DataTypes } = require('sequelize');
const db = require('../database/config');

const Loan = db.define('solicitud', {
    folio:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    estado: {
        type: DataTypes.BOOLEAN, //true=devuelto, false=no devuelto
        allowNull: false
    },
    fechaEstipuladaDev:{ 
        type: DataTypes.DATE,
        //allowNull: false
    },
    fechaRealDev: { 
        type: DataTypes.DATE //,
        //allowNull: true
    },
    observacion: {
        type: DataTypes.STRING
    }
},
{
    freezeTableName: true,
    createdAt: 'fechaInicio'
});

module.exports = Loan;