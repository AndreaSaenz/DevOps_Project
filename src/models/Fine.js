const db = require("./dbTest.json");

// const { DataTypes } = require("sequelize");

// function Fine(sequelize) {
//   const attributes = {
//     fineId: { type: DataTypes.SMALLINT, allowNull: false },
//     amount: { type: DataTypes.INTEGER, allowNull: false },
//     date: { type: DataTypes.DATE, allowNull: false },
//     remark: { type: DataTypes.TEXT, allowNull: false },
//     loanId: { type: DataTypes.SMALLINT, allowNull: false },
//     status: { type: DataTypes.BOOLEAN, allowNull: false },
//   };

//   return sequelize.define("Fine", attributes);
// }

const getAllFines = () => {
  return db.fines;
};

const getFineById = (searchedFineId) => {
  const oneFine = db.fines.find((fine) => fine.fineId === searchedFineId);
  return oneFine;
};

const createANewFine = (newFine) => {
  const isAlreadyAdded = db.fines.find(
    (fine) => fine.fineId === newFine.fineId
  );

  if (!isAlreadyAdded) {
    //function to save the info in the db
  } else {
    return { message: "This Fine already exists" };
  }
};

const updateFine = (fineId, fineStatus) => {
  //function to update fine in db
  return;
};

const deleteFine = (fineId) => {
  //function to delete fine
  return;
};
module.exports = {
  getAllFines,
  getFineById,
  createANewFine,
  updateFine,
  deleteFine,
};
