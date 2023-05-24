const express = require("express");
const router = express.Router();
const fineController = require("../controllers/fineController");
const verifyToken = require("../middlewares/auth");

router.get("/", verifyToken, fineController.getAllFines);

router.get("/:fineId", verifyToken, fineController.getFineById);

router.post("/", verifyToken, fineController.createNewFine);

router.put("/:fineId", verifyToken, fineController.updateOneFine);

router.delete("/:fineId", verifyToken, fineController.deleteOneFine);

module.exports = router;
