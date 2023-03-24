const fineService = require("../services/fineService");
const getAllFines = (req, res) => {
  res.send("Get all Fines");
};

const getFineById = (req, res) => {
  res.send(`Get the fine ${req.params.fineId}`);
};

const createNewFine = (req, res) => {
  res.send(`Create new fine ${req.params.fineId}`);
};

const updateOneFine = (req, res) => {
  res.send(`Update fine ${req.params.fineId}`);
};

const deleteOneFine = (req, res) => {
  res.send(`Delete fine ${req.params.fineId}`);
};

module.exports = {
  getAllFines,
  getFineById,
  createNewFine,
  updateOneFine,
  deleteOneFine,
};
