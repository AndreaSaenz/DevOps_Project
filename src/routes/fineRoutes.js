const express = require("express");
const router = express.Router();
const fineController = require("../controllers/fineController");
const verifyToken = require("../middlewares/auth");
//const jwt = require("jsonwebtoken");

// router.get("/", fineController.getAllFines);

// router.get("/get/:fineId", fineController.getFineById);

// router.post("/", fineController.createNewFine);

// router.put("/:fineId", fineController.updateOneFine);

// router.delete("/:fineId", fineController.deleteOneFine);

router.get("/", verifyToken, fineController.getAllFines);

router.get("/get/:fineId", verifyToken, async (req, res) => {
  await fineController.getFineById();
});

router.post("/", verifyToken, async (req, res) => {
  await fineController.createNewFine();
});

router.put("/:fineId", verifyToken, async (req, res) => {
  await fineController.updateOneFine();
});

router.delete("/:fineId", verifyToken, async (req, res) => {
  await fineController.deleteOneFine();
});

module.exports = router;
