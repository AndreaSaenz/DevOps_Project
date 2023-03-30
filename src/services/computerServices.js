const { Sequelize } = require('sequelize');
const Computer = require('../models/Computer');

const getAllComputers = async () => {
    try { 
        const allComputers = await Computer.findAll();
        return allComputers;
    } catch (error) {
        throw { status: 500, message: error };
    }
};

const getComputerById = async (computerId) => {
    try {
        const foundComputer = await Computer.findByPk(computerId);
        if ( !foundComputer ) {
            throw {
                status: 400,
                message: "Computer not found",
            }; 
        }        
        return foundComputer;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const createNewComputer = async (newComputer) => {
    try {
        const foundComputer = await Computer.findOne({ where: newComputer});
        if ( foundComputer ) {
            throw {
                status: 400,
                message: "Computer already exists",
            }; 
        }    
        const createdComputer = await Computer.create(newComputer);
        return createdComputer;
    } catch (error) {
        throw { status: error?.status || 500, message:error?.message || error };
    }
};

const updateOneComputer = async (computerId, changes) => {
    try {
        const updatedComputer = await Computer.findByPk(computerId);
        if ( !updatedComputer ) {
            throw {
                status: 400,
                message: "Computer not found",
              }; 
        }
        await updatedComputer.update(changes);
        updatedComputer.reload();
        return updatedComputer;
    } catch (error){
        throw { status: error?.status || 500, message: error?.message || error };
    }    
};

const deleteOneComputer = async (computerId) => {
    try {
        const computerToDelete = await Computer.findByPk(computerId);
        if ( !computerToDelete ) {
            throw {
                status: 400,
                message: "Computer not found",
              }; 
        }
        await computerToDelete.destroy();
    } catch (error){
        throw { status: error?.status || 500, message: error?.message || error };
    }    
};

module.exports = {
    getAllComputers,
    getComputerById,
    createNewComputer,
    updateOneComputer,
    deleteOneComputer
}