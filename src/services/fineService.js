const Fine = require("../models/Fine");

const getAllFines = () => {
  const allFines = Fine.getAllFines();
  return allFines;
};

const getFineById = (fineId) => {
  const foundFine = Fine.getFineById(fineId);
  return foundFine;
};

const createNewFine = (newFine) => {
  const newFine = Fine.createANewFine(newFine);
  return newFine;
};

const updateOneFine = (fineId, fineStatus) => {
  const updatedFine = Fine.updateFine(fineId, fineStatus);
  return;
};

const deleteOneFine = (fineId) => {
  Fine.deleteFine(fineId);
  return;
};

module.exports = {
  getAllFines,
  getFineById,
  createNewFine,
  updateOneFine,
  deleteOneFine,
};
