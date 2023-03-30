const computerService = require('../services/computerServices');

const getAllComputers = async (req, res) => {
    try { 
        const allComputers = await computerService.getAllComputers();
        res.status(200).json(allComputers);
    } catch (error) {
        res
            .status(error?.status || 500)
            .json({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getComputerById = async (req, res) => {
    const ComputerId = req.params.computerId;

    if (!ComputerId) {
        res.status(400).json({ status: "FAILED", data: { error: "computerId not indicated" } });
        return;
    }

    try {
        const foundComputer =  await computerService.getComputerById(computerId);
        res.status(200).json(foundComputer);
    } catch (error) {
        res
        .status(error?.status || 500)
        .json({ status: "FAILED", data: { error: error?.message || error } });
    }   
};

const createNewComputer = async (req, res) => {
    const { body } = req;

    if (
        //!body.id ||
        !body.Name ||
        !body.yearModel ||
        !body.memory||
        !body.monitorSize ||
        !body.ram || 
        !body.processor
    ){
        res.status(400).json({ status: "FAILED", data: { error: "Some parameters are missing"} });
        return;
    }

    try { 
        const newStudent = {
            //id: body.id,
            Name: body.Name,        
            yearModel: body.yearModel, 
            monitorSize: body.monitorSize, 
            ram: body.ram,
            processor: body.processor
        };

        const createdComputer = await computerService.createNewComputer(newComputer);
        res.status(201).json({ status: "OK", data: createdComputer});
    } catch (error) {
        res
        .status(error?.status || 500)
        .json({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const updateOneComputer = async (req, res) => {
    const computerId = req.params.computerId;
    const { body } = req;

    if (!computerId) {
        res.status(400).json({ status: "FAILED", data: { error: "computerId not indicated"} });
        return; 
    }

    if (
        //!body.id ||
        !body.Name 
    ){
        res.status(400).json({ status: "FAILED", data: { error: "Name can't be null"} });
        return;
    }

    try {
        const updatedComputer= await computerService.updateOneComputer(computerId, body);
        res.status(200).json(updatedComputer);
    } catch (error) {
        res
        .status(error?.status || 500)
        .json({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const deleteOneComputer= async (req, res) => {
    const computerId = req.params.computerId; 

    if (!computerId) {
        res.status(400).json({ status: "FAILED", data: { error: "computerId not indicated" } });
        return;
    }

    try {
        await studentService.deleteOneComputer(computerId);
        res.status(204).json({ status: "OK", message: "Computer deleted" });
    } catch (error) {
        res
        .status(error?.status || 500)
        .json({ status: "FAILED", data: { error: error?.message || error } });
    }  
};

module.exports = {
    getAllComputers,
    getComputerById,
    createNewComputer,
    updateOneComputer,
    deleteOneComputer
}