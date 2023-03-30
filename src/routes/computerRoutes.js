const express = require("express");
const router= express.Router();

var computerController = require('../controllers/computerController');

router.get("/", computerController.getAllComputers);

router.get("/:computerId", computerController.getComputerById);

router.post("/", computerController.createNewComputer);

router.put("/:computerId", computerController.updateOneComputer);

router.delete("/:computerId", computerController.deleteOneComputer);

module.exports = router;