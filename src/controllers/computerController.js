const computerService = require("../services/computerServices");
const logger = require("../logger");
const getAllComputers = async (req, res) => {
  logger.debug("getAllFines at computerController ");
  try {
    const allComputers = await computerService.getAllComputers();
    res.status(200).json(allComputers);
    logger.info(`VERB: ${req.method} - HEADERS: ${req.headers.authorization}`);
    logger.debug(`Method: getAllComputers - URL: ${req.originalUrl}`);
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
    logger.error(error);
  }
};

const getComputerById = async (req, res) => {
  logger.debug("getComputerById at computerController ");
  const computerId = req.params.computerId;

  if (!computerId) {
    res
      .status(400)
      .json({ status: "FAILED", data: { error: "computerId not indicated" } });
    logger.warn("MISSING_PARAMETERS: computerId");
    return;
  }

  try {
    const foundComputer = await computerService.getComputerById(computerId);
    res.status(200).json(foundComputer);
    logger.info(
      `VERB: ${req.method} - PARAMS:{ computerId: ${req.params.fineId} } - HEADERS: ${req.headers.authorization}`
    );
    logger.debug(`Method: getComputerById - URL: ${req.originalUrl}`);
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
    logger.error(error);
  }
};

const createNewComputer = async (req, res) => {
  logger.debug("createNewComputer at computerController ");
  const { body } = req;

  if (
    !body.Name ||
    !body.yearModel ||
    !body.memory ||
    !body.monitorSize ||
    !body.ram ||
    !body.processor
  ) {
    res.status(400).json({
      status: "FAILED",
      data: { error: "Some parameters are missing" },
    });
    logger.warn("MISSING SOME BODY ELEMENTS");
    return;
  }

  try {
    const newComputer = {
      Name: body.Name,
      yearModel: body.yearModel,
      memory: body.memory,
      monitorSize: body.monitorSize,
      ram: body.ram,
      processor: body.processor,
    };

    const createdComputer = await computerService.createNewComputer(
      newComputer
    );
    res.status(201).json({ status: "OK", data: createdComputer });
    logger.info(`VERB: ${req.method} - HEADERS: ${req.headers.authorization}`);
    logger.debug(
      `Method: createNewComputer - URL: ${req.originalUrl} - BODY: {${req.body}}`
    );
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
    logger.error(error);
  }
};

const updateOneComputer = async (req, res) => {
  logger.debug("updateOneComputer at computerController ");
  const computerId = req.params.computerId;
  const { body } = req;

  if (!computerId) {
    res
      .status(400)
      .json({ status: "FAILED", data: { error: "computerId not indicated" } });
    logger.warn("MISSING_PARAMETERS: computerId");
    return;
  }

  if (!body.Name) {
    res
      .status(400)
      .json({ status: "FAILED", data: { error: "Name can't be null" } });
    logger.warn("MISSING_BODY: Name");
    return;
  }

  try {
    const updatedComputer = await computerService.updateOneComputer(
      computerId,
      body
    );
    res.status(200).json(updatedComputer);
    logger.info(
      `VERB: ${req.method} - PARAMS: fineId: ${req.params.fineId} - HEADERS: ${req.headers.authorization}`
    );
    logger.debug(
      `Method: updateOneComputer - URL: ${req.originalUrl} - BODY: { ${req.body} }`
    );
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
    logger.error(error);
  }
};

const deleteOneComputer = async (req, res) => {
  logger.debug("deleteOneComputer at computerController ");
  const computerId = req.params.computerId;

  if (!computerId) {
    res
      .status(400)
      .json({ status: "FAILED", data: { error: "computerId not indicated" } });
    logger.warn("MISSING_PARAMETERS: computerId");
    return;
  }

  try {
    await computerService.deleteOneComputer(computerId);
    res.status(204).json({ status: "OK", message: "Computer deleted" });
    logger.info(
      `VERB: ${req.method} - PARAMS: {fineId: ${req.params.fineId}} - HEADERS: ${req.headers.authorization}`
    );
    logger.debug(`Method: deleteOneFComputer - URL: ${req.originalUrl}`);
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
    logger.error(error);
  }
};

module.exports = {
  getAllComputers,
  getComputerById,
  createNewComputer,
  updateOneComputer,
  deleteOneComputer,
};
