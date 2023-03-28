const studentService = require('../services/studentServices');

const getAllStudents = (req, res) => {
    try { 
        const allStudents = studentService.getAllStudents();
        res.status(200).json(allStudents);
    } catch (error) {
        res
            .status(error?.status || 500)
            .json({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getStudentById = (req, res) => {
    const { params: studentId } = req; 

    if (!studentId) {
        res.status(400).json({ status: "FAILED", data: { error: "studentId not indicated" } });
    }

    try {
        const foundStudent = studentService.getStudentById(req.params.studentId);
        res.status(200).json(foundStudent);
    } catch (error) {
        res
        .status(error?.status || 500)
        .json({ status: "FAILED", data: { error: error?.message || error } });
    }   
};

const createNewStudent = (req, res) => {
    const { body } = req;

    if (
        //!body.id ||
        !body.Name ||
        !body.email ||
        !body.telefono ||
        !body.licenciatura ||
        !body.semestre
    ){
        res.status(400).json({ status: "FAILED", data: { error: "Some parameters are missing"} });
    }

    try { 
        const newStudent = {
            //id: body.id,
            Name: body.Name,        
            email: body.email, 
            telefono: body.telefono, 
            licenciatura: body.licenciatura,
            semestre: body.semestre
        };

        const createdStudent = studentService.createNewStudent(newStudent);
        res.status(201).json({ status: "OK", data: createdStudent});
    } catch (error) {
        res
        .status(error?.status || 500)
        .json({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const updateOneStudent = (req, res) => {
    const studentId = req.params.studentId;
    const { body } = req;

    if (!studentId) {
        res.status(400).json({ status: "FAILED", data: { error: "studentId not indicated"} }); 
    }

    try {
        const updatedStudent = studentService.updateOneStudent(studentId, body);
        res.status(200).json(updatedStudent);
    } catch (error) {
        res
        .status(error?.status || 500)
        .json({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const deleteOneStudent = (req, res) => {
    const { params: studentId } = req; 

    if (!studentId) {
        res.status(400).json({ status: "FAILED", data: { error: "studentId not indicated" } });
    }

    try {
        studentService.deleteOneStudent(studentId);
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
    deleteOneStudent
}