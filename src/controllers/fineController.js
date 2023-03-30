const fineService = require("../services/fineService");

const getAllFines = async (req, res) => {
  const allFines = await fineService.getAllFines();
  res.send({ status: "200", data: allFines });
};

const getFineById = async (req, res) => {
  const fine = await fineService.getFineById(req.params.fineId);
  res.send({ status: "200", data: fine });
};

const createNewFine = async (req, res) => {
  const { body } = req;

  // Validation for all the necessary info
  if (!(body.monto && body.observacion && body.folioSolictud && body.estado)) {
    return { message: "You didn't submmit the necesary parameters. " };
  }

  const newFine = {
    monto: body.monto,
    observacion: body.observacion,
    folioSolicitud: body.folioSolicitud,
    estado: body.estado,
  };
  const createdFine = await fineService.createNewFine(newFine);
  res.status(201).send({ status: "OK", data: createdFine });
};

const updateOneFine = async (req, res) => {
  const fineId = req.params.fineId;
  const { body } = req;

  if (!fineId || !body.estado) {
    return { message: "Enter the fine id and nw status" };
  }
  const updatedFine = await fineService.updateOneFine(fineId, body.estado);
  res.status(200).send({ status: "OK", data: updatedFine });
};

const deleteOneFine = async (req, res) => {
  await fineService.deleteOneFine(req.params.fineId);
  res.send({ status: "OK", message: "Fine Deleted" });
};

module.exports = {
  getAllFines,
  getFineById,
  createNewFine,
  updateOneFine,
  deleteOneFine,
};
