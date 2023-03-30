const express = require("express");
const router= express.Router();

var loanController = require('../controllers/loanController');

router.get("/", loanController.getAllLoans);

router.get("/:loanId", loanController.getLoanById);

router.post("/", loanController.createNewLoan);

router.put("/:loanId", loanController.updateOneLoan);

router.delete("/:loanId", loanController.deleteOneLoan);

module.exports = router;