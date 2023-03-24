const express = require("express");
const router = express.Router();
const fineController = require("../controllers/fineController");

router.get("/", fineController.getAllFines);

router.get("/:fineId", fineController.getFineById);

router.post("/", fineController.createNewFine);

router.put("/:fineId", fineController.updateOneFine);

router.delete("/:fineId", fineController.deleteOneFine);

module.exports = router;
