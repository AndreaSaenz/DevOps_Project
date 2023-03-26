const fineService = require("../services/fineService");

const getAllFines = (req, res) => {
  const allFines = fineService.getAllFines();
  res.send({ status: "200", data: allFines });
};

const getFineById = (req, res) => {
  const fine = fineService.getFineById(req.params.fineId);
  //res.send(`Get the fine ${req.params.fineId}`);
  res.send({ status: "200", data: fine });
};

const createNewFine = (req, res) => {
  const { body } = req;

  // Validation for all the necessary info
  if (
    !body.fineId ||
    !body.amount ||
    !body.date ||
    !body.remark ||
    !body.loanId ||
    !body.status
  ) {
    return { message: "You didn't submmit the necesary parameters. " };
  }

  const newFine = {
    fineId: body.fineId,
    amount: body.amount,
    date: body.date,
    remark: body.remark,
    loanId: body.loanId,
    status: body.status,
  };
  const createdFine = fineService.createNewFine(newFine);
  res.status(201).send({ status: "OK", data: createdFine });
};

const updateOneFine = (req, res) => {
  const fineId = req.params.fineId;
  const fineStatus = req.params.status;

  if (!fineId || !fineStatus) {
    return;
  }
  const updatedFine = fineService.updateOneFine(fineId, fineStatus);
  //res.send(`Update fine ${req.params.fineId}`);
  res.status(200).send({ status: "OK", data: updatedFine });
};

const deleteOneFine = (req, res) => {
  fineService.deleteOneFine(req.params.fineId);
  //res.send(`Delete fine ${req.params.fineId}`);
  res.send({ status: "OK", message: "Fine Deleted" });
};

module.exports = {
  getAllFines,
  getFineById,
  createNewFine,
  updateOneFine,
  deleteOneFine,
};
