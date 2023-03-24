const { DataTypes } = require("sequelize");

function Fine(sequelize) {
  const attributes = {
    fineId: { type: DataTypes.SMALLINT, allowNull: false },
    amount: { type: DataTypes.INTEGER, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    remark: { type: DataTypes.TEXT, allowNull: false },
    loanId: { type: DataTypes.SMALLINT, allowNull: false },
    status: { type: DataTypes.BOOLEAN, allowNull: false },
  };

  return sequelize.define("Fine", attributes);
}

module.exports = Fine;
