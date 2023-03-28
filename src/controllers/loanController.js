const loanService = require('../services/loanServices');

const getAllLoans = (req, res) => {
    try { 
        const allLoans = loanService.getAllLoans();
        res.status(200).json(allLoans);
    } catch (error) {
        res
            .status(error?.status || 500)
            .json({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getLoanById = (req, res) => {
    const { params: loanId } = req; 

    if (!loanId) {
        res.status(400).json({ status: "FAILED", data: { error: "loanId not indicated" } });
    }

    try {
        const foundLoan = loanService.getLoanById(req.params.loanId);
        res.status(200).json(foundLoan);
    } catch (error) {
        res
        .status(error?.status || 500)
        .json({ status: "FAILED", data: { error: error?.message || error } });
    }   
};

const createNewLoan = (req, res) => {
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
    }

    try { 
        const newLoan = {
            //folio: body.folio,
            estado: body.estado,        
            //fechaInicio: body.fechaInicio, 
            fechaEstipuladaDev: body.fechaEstipuladaDev, 
            fechaRealDev: null, //body.fechaRealDev, 
            observacion: body.observacion
        };

        const createdLoan = loanService.createNewLoan(newLoan);
        res.status(201).json({ status: "OK", data: createdLoan});
    } catch (error) {
        res
        .status(error?.status || 500)
        .json({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const updateOneLoan = (req, res) => {
    const loanId = req.params.loanId;
    const { body } = req;

    if (!loanId) {
        res.status(400).json({ status: "FAILED", data: { error: "loanId not indicated"} }); 
    }

    if (
        //!body.folio ||
        !body.estado ||
        !body.fechaInicio ||
        !body.fechaEstipuladaDev
    ){
        res.status(400).json({ status: "FAILED", data: { error: "Estado, fechaInicio and fechaEstipuladaDev can't be null"} });
    }

    try {
        const updatedLoan = loanService.updateOneLoan(loanId, body);
        res.status(200).json(updatedLoan);
    } catch (error) {
        res
        .status(error?.status || 500)
        .json({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const deleteOneLoan = (req, res) => {
    const { params: loanId } = req; 

    if (!loanId) {
        res.status(400).json({ status: "FAILED", data: { error: "loanId not indicated" } });
    }

    try {
        loanService.deleteOneLoan(loanId);
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