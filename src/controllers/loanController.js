const loanService = require('../services/loanServices');

const getAllLoans = async (req, res) => {
    try { 
        const allLoans = await loanService.getAllLoans();
        res.status(200).json(allLoans);
    } catch (error) {
        res
            .status(error?.status || 500)
            .json({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getLoanById = async (req, res) => {
    const loanId = req.params.loanId; 

    if (!loanId) {
        res.status(400).json({ status: "FAILED", data: { error: "loanId not indicated" } });
        return;
    }

    try {
        const foundLoan = await loanService.getLoanById(loanId);
        res.status(200).json(foundLoan);
    } catch (error) {
        res
        .status(error?.status || 500)
        .json({ status: "FAILED", data: { error: error?.message || error } });
    }   
};

const createNewLoan = async (req, res) => {
    const { body } = req;

    if (
        //!body.folio ||
        !body.estado ||
       // !body.fechaInicio ||
        !body.fechaEstipuladaDev //||
       // !body.fechaRealDev ||
       // !body.observacion
    ){
        res.status(400).json({ status: "FAILED", data: { error: "Some parameters are missing"} });
        return;
    }

    try { 
        const newLoan = {
            //folio: body.folio,
            estado: body.estado,        
            //fechaInicio: body.fechaInicio, 
            fechaEstipuladaDev: body.fechaEstipuladaDev, 
            fechaRealDev: body.fechaRealDev, //null
            observacion: body.observacion
        };

        const createdLoan = await loanService.createNewLoan(newLoan);
        res.status(201).json({ status: "OK", data: createdLoan});
    } catch (error) {
        res
        .status(error?.status || 500)
        .json({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const updateOneLoan = async (req, res) => {
    const loanId = req.params.loanId;
    const { body } = req;

    if (!loanId) {
        res.status(400).json({ status: "FAILED", data: { error: "loanId not indicated"} }); 
        return;
    }

    if (
        //!body.folio ||
        !body.estado ||
        !body.fechaInicio ||
        !body.fechaEstipuladaDev
    ){
        res.status(400).json({ status: "FAILED", data: { error: "Estado, fechaInicio and fechaEstipuladaDev can't be null"} });
        return;
    }

    try {
        const updatedLoan = await loanService.updateOneLoan(loanId, body);
        res.status(200).json(updatedLoan);
    } catch (error) {
        res
        .status(error?.status || 500)
        .json({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const deleteOneLoan = async (req, res) => {
    const loanId = req.params.loanId; 

    if (!loanId) {
        res.status(400).json({ status: "FAILED", data: { error: "loanId not indicated" } });
        return;
    }

    try {
        await loanService.deleteOneLoan(loanId);
        res.status(204).json({ status: "OK", message: "Loan deleted" });
    } catch (error) {
        res
        .status(error?.status || 500)
        .json({ status: "FAILED", data: { error: error?.message || error } });
    }  
};

module.exports = {
    getAllLoans,
    getLoanById,
    createNewLoan,
    updateOneLoan,
    deleteOneLoan
}