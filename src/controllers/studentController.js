const studentService = require("../services/studentServices");
const logger = require("../logger");
const MaskData = require("maskdata");

const getAllStudents = async (req, res) => {
  try {
    const allStudents = await studentService.getAllStudents();
    res.status(200).json(allStudents);
    logger.info(
      `VERB: ${req.method}; QUERY_PARAMS: ${req.params}; HEADERS: Authorization: ${req.headers.authorization}`
    );
    logger.debug(
      `Method: getAllStudents; Query_Method: findAll(); URL: ${req.originalUrl}`
    );
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
    logger.error(error);
  }
};

const getStudentById = async (req, res) => {
  const studentId = req.params.studentId;

  if (!studentId) {
    res
      .status(400)
      .json({ status: "FAILED", data: { error: "studentId not indicated" } });
    logger.warn("MISSING_PARAMETER: studentId");
    return;
  }

  try {
    const foundStudent = await studentService.getStudentById(studentId);
    res.status(200).json(foundStudent);
    logger.info(
      `VERB: ${req.method}; QUERY_PARAMS:{ studentId: ${req.params.fineId} }; HEADERS: Authorization: ${req.headers.authorization}`
    );
    logger.debug(
      `Method: getStudentById: Query_Method: findByPk(); URL: ${req.originalUrl}`
    );
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
    logger.error(error);
  }
};

const createNewStudent = async (req, res) => {
  const { body } = req;

  if (
    !body.Name ||
    !body.email ||
    !body.telefono ||
    !body.licenciatura ||
    !body.semestre
  ) {
    res.status(400).json({
      status: "FAILED",
      data: { error: "Some parameters are missing" },
    });
    logger.warn("MISSING SOME BODY ELEMENTS");
    return;
  }

  try {
    const newStudent = {
      Name: body.Name,
      email: body.email,
      telefono: body.telefono,
      licenciatura: body.licenciatura,
      semestre: body.semestre,
    };

    const createdStudent = await studentService.createNewStudent(newStudent);
    res.status(201).json({ status: "OK", data: createdStudent });
    const maskedEmail = MaskData.maskEmail2(body.email);
    const maskedPhone = MaskData.maskPhone(body.telefono);
    logger.info(
      `VERB: ${req.method}; QUERY_PARAMS: ${req.params}; HEADERS: Authorization: ${req.headers.authorization}`
    );
    logger.debug(
      `Method: createNewStudent; Query_Method: create(); URL: ${req.originalUrl}; BODY: { name: ${body.Name}, email: ${maskedEmail}, telefono: ${maskedPhone}, licenciatura: ${body.licenciatura}, semestre: ${body.semestre} }`
    );
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
    logger.error(error);
  }
};

const updateOneStudent = async (req, res) => {
  const studentId = req.params.studentId;
  const { body } = req;

  if (!studentId) {
    res
      .status(400)
      .json({ status: "FAILED", data: { error: "studentId not indicated" } });
    logger.warn("MISSING_PARAMETER: studentId");
    return;
  }

  if (!body.Name || !body.email) {
    res.status(400).json({
      status: "FAILED",
      data: { error: "Name and email can't be null" },
    });
    logger.warn("MISSING SOME BODY ELEMENTS");
    return;
  }

  try {
    const updatedStudent = await studentService.updateOneStudent(
      studentId,
      body
    );
    res.status(200).json(updatedStudent);
    const maskedEmail = MaskData.maskEmail2(body.email);
    logger.info(
      `VERB: ${req.method} - PARAMS: studentId: ${req.params.fineId}; HEADERS: Authorization: ${req.headers.authorization}`
    );
    logger.debug(
      `Method: updateOneStudent; Query_Method: update(); URL: ${req.originalUrl}; BODY: { name: ${body.Name}, email: ${maskedEmail} }`
    );
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
    logger.error(error);
  }
};

const deleteOneStudent = async (req, res) => {
  const studentId = req.params.studentId;

  if (!studentId) {
    res
      .status(400)
      .json({ status: "FAILED", data: { error: "studentId not indicated" } });
    logger.warn("MISSING_PARAMETER: studentId");
    return;
  }

  try {
    await studentService.deleteOneStudent(studentId);
    res.status(204).json({ status: "OK", message: "Student deleted" });
    logger.info(
      `VERB: ${req.method}; QUERY_PARAMS: {studentId: ${req.params.fineId}}; HEADERS: Authorization: ${req.headers.authorization}`
    );
    logger.debug(
      `Method: deleteOneStudent; Query_Method: destroy(); URL: ${req.originalUrl}`
    );
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
    logger.error(error);
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createNewStudent,
  updateOneStudent,
  deleteOneStudent,
};
