const express = require("express");
const router= express.Router();
var computerController = require('../controllers/computerController');
const verifyToken = require("../middlewares/auth");

/*router.get("/", computerController.getAllComputers);

router.get("/:computerId", computerController.getComputerById);

router.post("/", computerController.createNewComputer);

router.put("/:computerId", computerController.updateOneComputer);

router.delete("/:computerId", computerController.deleteOneComputer);*/

router.get("/", verifyToken, computerController.getAllComputers);

router.get("/:computerId", verifyToken, computerController.getComputerById);

router.post("/", verifyToken, computerController.createNewComputer);

router.put("/:computerId", verifyToken, computerController.updateOneComputer);

router.delete("/:computerId", verifyToken, computerController.deleteOneComputer);


module.exports = router;