const loanService = require("../services/loanServices");
const logger = require("../logger");

const getAllLoans = async (req, res) => {
  try {
    const allLoans = await loanService.getAllLoans();
    res.status(200).json(allLoans);
    logger.info(`VERB: ${req.method} - HEADERS: ${req.headers.authorization}`);
    logger.debug(`Method: getAllLoans - URL: ${req.originalUrl}`);
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
    logger.error(error);
  }
};

const getLoanById = async (req, res) => {
  const loanId = req.params.loanId;

  if (!loanId) {
    res
      .status(400)
      .json({ status: "FAILED", data: { error: "loanId not indicated" } });
    logger.warn("MISSING_PARAMETERS: loanId");
    return;
  }

  try {
    const foundLoan = await loanService.getLoanById(loanId);
    res.status(200).json(foundLoan);
    logger.info(
      `VERB: ${req.method} - PARAMS:{ fineId: ${req.params.fineId} } - HEADERS: ${req.headers.authorization}`
    );
    logger.debug(`Method: getLoanById - URL: ${req.originalUrl}`);
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
    logger.error(error);
  }
};

const createNewLoan = async (req, res) => {
  const { body } = req;

  if (!body.estado || !body.fechaEstipuladaDev) {
    res.status(400).json({
      status: "FAILED",
      data: { error: "Some parameters are missing" },
    });
    logger.warn("MISSING SOME BODY ELEMENTS");
    return;
  }

  try {
    const newLoan = {
      estado: body.estado,
      fechaEstipuladaDev: body.fechaEstipuladaDev,
      fechaRealDev: body.fechaRealDev, //null
      observacion: body.observacion,
    };

    const createdLoan = await loanService.createNewLoan(newLoan);
    res.status(201).json({ status: "OK", data: createdLoan });
    logger.info(`VERB: ${req.method} - HEADERS: ${req.headers.authorization}`);
    logger.debug(
      `Method: createNewLoan - URL: ${req.originalUrl} - BODY: {${req.body}}`
    );
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
    logger.error(error);
  }
};

const updateOneLoan = async (req, res) => {
  const loanId = req.params.loanId;
  const { body } = req;

  if (!loanId) {
    res
      .status(400)
      .json({ status: "FAILED", data: { error: "loanId not indicated" } });
    logger.warn("MISSING_PARAMETER: loanId");
    return;
  }

  if (!body.estado || !body.fechaInicio || !body.fechaEstipuladaDev) {
    res.status(400).json({
      status: "FAILED",
      data: {
        error: "Estado, fechaInicio and fechaEstipuladaDev can't be null",
      },
    });
    logger.warn("MISSING SOME BODY ELEMENTS");
    return;
  }

  try {
    const updatedLoan = await loanService.updateOneLoan(loanId, body);
    res.status(200).json(updatedLoan);
    logger.info(
      `VERB: ${req.method} - PARAMS: fineId: ${req.params.fineId} - HEADERS: ${req.headers.authorization}`
    );
    logger.debug(
      `Method: updateOneLoan - URL: ${req.originalUrl} - BODY: { ${req.body} }`
    );
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
    logger.error(error);
  }
};

const deleteOneLoan = async (req, res) => {
  const loanId = req.params.loanId;

  if (!loanId) {
    res
      .status(400)
      .json({ status: "FAILED", data: { error: "loanId not indicated" } });
    logger.warn("MISSING_PARAMETERS: loanId");
    return;
  }

  try {
    await loanService.deleteOneLoan(loanId);
    res.status(204).json({ status: "OK", message: "Loan deleted" });
    logger.info(
      `VERB: ${req.method} - PARAMS: {fineId: ${req.params.fineId}} - HEADERS: ${req.headers.authorization}`
    );
    logger.debug(`Method: deleteOneLoan - URL: ${req.originalUrl}`);
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
    logger.error(error);
  }
};

module.exports = {
  getAllLoans,
  getLoanById,
  createNewLoan,
  updateOneLoan,
  deleteOneLoan,
};
