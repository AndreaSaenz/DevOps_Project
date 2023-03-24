const fineService = require("../services/fineService");

const getAllFines = (req, res) => {
  const allFines = fineService.getAllFines();
  res.send("Get all Fines");
};

const getFineById = (req, res) => {
  const fine = fineService.getFineById(req.params.fineId);
  res.send(`Get the fine ${req.params.fineId}`);
};

const createNewFine = (req, res) => {
  const createdFine = fineService.createNewFine(req.params.fineId);
  res.send(`Create new fine ${req.params.fineId}`);
};

const updateOneFine = (req, res) => {
  const updatedFine = fineService.updateOneFine(req.params.fineId);
  res.send(`Update fine ${req.params.fineId}`);
};

const deleteOneFine = (req, res) => {
  fineService.deleteOneFine(req.params.fineId);
  res.send(`Delete fine ${req.params.fineId}`);
};

module.exports = {
  getAllFines,
  getFineById,
  createNewFine,
  updateOneFine,
  deleteOneFine,
};
