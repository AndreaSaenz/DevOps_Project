const { Sequelize } = require('sequelize');
const Loan = require('../models/Loan');

const getAllLoans = async () => {
    try { 
        const allLoans = await Loan.findAll();
        return allLoans;
    } catch (error) {
        throw { status: 500, message: error };
    }
};

const getLoanById = async (loanId) => {
    try {
        const foundLoan = await Loan.findByPk(loanId);
        if ( !foundLoan ) {
            throw {
                status: 400,
                message: "Loan not found",
            }; 
        }        
        return foundLoan;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const createNewLoan = async (newLoan) => {
    try {
        const foundLoan = await Loan.findOne({ where: newLoan });
        if ( foundLoan ) {
            throw {
                status: 400,
                message: "Loan already exists",
            }; 
        }    
        const createdLoan = await Loan.create(newLoan);
        return createdLoan;
    } catch (error) {
        throw { status: error?.status || 500, message:error?.message || error };
    }
};

const updateOneLoan = async (loanId, changes) => {
    try {
        const updatedLoan = await Loan.findByPk(loanId);
        if ( !updatedLoan ) {
            throw {
                status: 400,
                message: "Loan not found",
              }; 
        }
        await updatedLoan.update(changes);
        updatedLoan.reload();
        return updatedLoan;
    } catch (error){
        throw { status: error?.status || 500, message: error?.message || error };
    }

    
    
};

const deleteOneLoan = async (loanId) => {
    try {
        const loanToDelete = await Loan.findByPk(loanId);
        if ( !loanToDelete ) {
            throw {
                status: 400,
                message: "Loan not found",
              }; 
        }
        await loanToDelete.destroy();
    } catch (error){
        throw { status: error?.status || 500, message: error?.message || error };
    }    
};

module.exports = {
    getAllLoans,
    getLoanById,
    createNewLoan,
    updateOneLoan,
    deleteOneLoan
}