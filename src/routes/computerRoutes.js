const express = require("express");
const router= express.Router();

var computerController = require('../controllers/computerController');

router.get("/", computerController.getAllComputers);

router.get("/:computerId", computerController.getComuterById);

router.post("/", computerController.createNewComuter);

router.put("/:computerId", computerController.updateOneComuter);

router.delete("/:computerId", computerController.deleteOneComuter);

module.exports = router;