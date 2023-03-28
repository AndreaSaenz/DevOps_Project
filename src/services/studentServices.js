const { Sequelize } = require('sequelize');
const Student = require('../models/Student');

const getAllStudents = async () => {
    try { 
        const allStudents = await Student.findAll();
        return allStudents;
    } catch (error) {
        throw { status: 500, message: error };
    }
};

const getStudentById = async (studentId) => {
    try {
        const foundStudent = await Student.findByPk(studentId);
        if ( !foundStudent ) {
            throw {
                status: 400,
                message: "Student not found",
            }; 
        }        
        return foundStudent;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const createNewStudent = async (newStudent) => {
    try {
        const foundStudent = await Student.findByPk(studentId);
        if ( foundStudent ) {
            throw {
                status: 400,
                message: "Student already exists",
            }; 
        }    
        const createdStudent = await Student.create(newStudent);
        return createdStudent;
    } catch (error) {
        throw { status: error?.status || 500, message:error?.message || error };
    }
};

const updateOneStudent = async (studentId, changes) => {
    try {
        const updatedStudent = await Student.findByPk(studentId);
        if ( !updatedStudent ) {
            throw {
                status: 400,
                message: "Student not found",
              }; 
        }
        await updatedStudent.save(changes);
        updatedStudent.reload();
        return updatedStudent;
    } catch (error){
        throw { status: error?.status || 500, message: error?.message || error };
    }

    
    
};

const deleteOneStudent = async (studentId) => {
    try {
        const studentToDelete = await Student.findByPk(studentId);
        if ( !studentToDelete ) {
            throw {
                status: 400,
                message: "Student not found",
              }; 
        }
        await studentToDelete.destroy();
    } catch (error){
        throw { status: error?.status || 500, message: error?.message || error };
    }    
};

module.exports = {
    getAllStudents,
    getStudentById,
    createNewStudent,
    updateOneStudent,
    deleteOneStudent
}