const studentService = require("../services/studentServices");

const getAllStudents = async (req, res) => {
  try {
    const allStudents = await studentService.getAllStudents();
    res.status(200).json(allStudents);
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getStudentById = async (req, res) => {
  const studentId = req.params.studentId;

  if (!studentId) {
    res
      .status(400)
      .json({ status: "FAILED", data: { error: "studentId not indicated" } });
    return;
  }

  try {
    const foundStudent = await studentService.getStudentById(studentId);
    res.status(200).json(foundStudent);
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createNewStudent = async (req, res) => {
  const { body } = req;

  if (
    //!body.id ||
    !body.Name ||
    !body.email ||
    !body.telefono ||
    !body.licenciatura ||
    !body.semestre
  ) {
    res
      .status(400)
      .json({
        status: "FAILED",
        data: { error: "Some parameters are missing" },
      });
    return;
  }

  try {
    const newStudent = {
      //id: body.id,
      Name: body.Name,
      email: body.email,
      telefono: body.telefono,
      licenciatura: body.licenciatura,
      semestre: body.semestre,
    };

    const createdStudent = await studentService.createNewStudent(newStudent);
    res.status(201).json({ status: "OK", data: createdStudent });
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateOneStudent = async (req, res) => {
  const studentId = req.params.studentId;
  const { body } = req;

  if (!studentId) {
    res
      .status(400)
      .json({ status: "FAILED", data: { error: "studentId not indicated" } });
    return;
  }

  if (
    //!body.id ||
    !body.Name ||
    !body.email
  ) {
    res
      .status(400)
      .json({
        status: "FAILED",
        data: { error: "Name and email can't be null" },
      });
    return;
  }

  try {
    const updatedStudent = await studentService.updateOneStudent(
      studentId,
      body
    );
    res.status(200).json(updatedStudent);
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteOneStudent = async (req, res) => {
  const studentId = req.params.studentId;

  if (!studentId) {
    res
      .status(400)
      .json({ status: "FAILED", data: { error: "studentId not indicated" } });
    return;
  }

  try {
    await studentService.deleteOneStudent(studentId);
    res.status(204).json({ status: "OK", message: "Student deleted" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createNewStudent,
  updateOneStudent,
  deleteOneStudent,
};
