const fineService = require("../services/fineServices");

const getAllFines = async (req, res) => {
  try {
    const allFines = await fineService.getAllFines();
    res.status(200).json(allFines);
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }  
};

const getFineById = async (req, res) => {
  const fineId = req.params.fineId;

  if (!fineId) {
    res
      .status(400)
      .json({ status: "FAILED", data: { error: "fineId not indicated" } });
    return;
  }

  try {
    const foundFine = await fineService.getFineById(fineId);
    res.status(200).json(foundFine);
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createNewFine = async (req, res) => {
  const { body } = req;

  if (!body.monto || !body.folioSolictud) {
    res
      .status(400)
      .json({ status: "FAILED", data: { error: "Some parameters are missing" } });
    return;
  }

  try{
    const newFine = {
      monto: body.monto,
      observacion: body.observacion,
      folioSolicitud: body.folioSolicitud,
      estado: body.estado,
    };
    
    const createdFine = await fineService.createNewFine(newFine);
    res.status(201).json({ status: "OK", data: createdFine });
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateOneFine = async (req, res) => {
  const fineId = req.params.fineId;
  const { body } = req;

  if (!fineId) {
    res
      .status(400)
      .json({ status: "FAILED", data: { error: "fineId not indicated" } });
    return;
  }

  if (!body.estado) {
    res
      .status(400)
      .json({ status: "FAILED", data: { error: "Status can't be null" }});
    return;
  }

  try {
    const updatedFine = await fineService.updateOneFine(fineId, body);
    res.status(200).json(updatedFine);
  } catch (error) {
    res
    .status(error?.status || 500)
    .json({ status: "FAILED", data: { error: error?.message || error } });
  } 
};

const deleteOneFine = async (req, res) => {

  const fineId = req.params.fineId;

  if (!fineId) {
    res
      .status(400)
      .json({ status: "FAILED", data: { error: "fineId not indicated" } });
    return;
  }

  try {
    await fineService.deleteOneFine(fineId);
    res.status(204).json({ status: "OK", message: "Fine deleted" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllFines,
  getFineById,
  createNewFine,
  updateOneFine,
  deleteOneFine,
};
