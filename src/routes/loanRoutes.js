const express = require("express");
const router= express.Router();
var loanController = require('../controllers/loanController');
const verifyToken = require("../middlewares/auth");

/*router.get("/", loanController.getAllLoans);

router.get("/:loanId", loanController.getLoanById);

router.post("/", loanController.createNewLoan);

router.put("/:loanId", loanController.updateOneLoan);

router.delete("/:loanId", loanController.deleteOneLoan);*/

router.get("/", verifyToken, loanController.getAllLoans);

router.get("/:loanId", verifyToken, loanController.getLoanById);

router.post("/", verifyToken, loanController.createNewLoan);

router.put("/:loanId", verifyToken, loanController.updateOneLoan);

router.delete("/:loanId", verifyToken, loanController.deleteOneLoan);

module.exports = router;