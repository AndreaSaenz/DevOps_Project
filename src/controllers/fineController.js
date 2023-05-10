const fineService = require("../services/fineServices");
const logger = require("../logger");

const getAllFines = async (req, res) => {
  try {
    const allFines = await fineService.getAllFines();
    res.status(200).json(allFines);
    logger.info(`VERB: ${req.method} - HEADERS: ${req.headers.authorization}`);
    logger.debug(`Method: getAllFines - URL: ${req.originalUrl}`);
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
    logger.error(error);
  }
};

const getFineById = async (req, res) => {
  const fineId = req.params.fineId;

  if (!fineId) {
    res
      .status(400)
      .json({ status: "FAILED", data: { error: "fineId not indicated" } });
    logger.error("MISSING_PARAMETERS: fineId");
    return;
  }

  try {
    const foundFine = await fineService.getFineById(fineId);
    res.status(200).json(foundFine);
    logger.info(
      `VERB: ${req.method} - PARAMS:{ fineId: ${req.params.fineId} } - HEADERS: ${req.headers.authorization}`
    );
    logger.debug(`Method: getFineById - URL: ${req.originalUrl}`);
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
    logger.error(error);
  }
};

const createNewFine = async (req, res) => {
  const { body } = req;

  if (!body.monto || !body.folioSolictud) {
    res.status(400).json({
      status: "FAILED",
      data: { error: "Some parameters are missing" },
    });
    logger.warn("MISSING SOME BODY ELEMENTS");
    return;
  }

  try {
    const newFine = {
      monto: body.monto,
      observacion: body.observacion,
      folioSolicitud: body.folioSolicitud,
      estado: body.estado,
    };

    const createdFine = await fineService.createNewFine(newFine);
    res.status(201).json({ status: "OK", data: createdFine });
    logger.info(`VERB: ${req.method} - HEADERS: ${req.headers.authorization}`);
    logger.debug(
      `Method: createNewFine - URL: ${req.originalUrl} - BODY: {${req.body}}`
    );
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
    logger.error(error);
  }
};

const updateOneFine = async (req, res) => {
  const fineId = req.params.fineId;
  const { body } = req;

  if (!fineId) {
    res
      .status(400)
      .json({ status: "FAILED", data: { error: "fineId not indicated" } });
    logger.warn("MISSING_PARAMETERS: fineId");
    return;
  }

  if (!body.estado) {
    res
      .status(400)
      .json({ status: "FAILED", data: { error: "Status can't be null" } });
    logger.error("MISSING_BODY: estado");
    return;
  }

  try {
    const updatedFine = await fineService.updateOneFine(fineId, body);
    res.status(200).json(updatedFine);
    logger.info(
      `VERB: ${req.method} - PARAMS: fineId: ${req.params.fineId} - HEADERS: ${req.headers.authorization}`
    );
    logger.debug(
      `Method: updateOneFine - URL: ${req.originalUrl} - BODY: { ${req.body} }`
    );
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
    logger.error("MISSING_PARAMETERS: fineId");
    return;
  }

  try {
    await fineService.deleteOneFine(fineId);
    res.status(204).json({ status: "OK", message: "Fine deleted" });
    logger.info(
      `VERB: ${req.method} - PARAMS: {fineId: ${req.params.fineId}} - HEADERS: ${req.headers.authorization}`
    );
    logger.debug(`Method: deleteOneFine - URL: ${req.originalUrl}`);
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
    logger.error(error);
  }
};

module.exports = {
  getAllFines,
  getFineById,
  createNewFine,
  updateOneFine,
  deleteOneFine,
};
