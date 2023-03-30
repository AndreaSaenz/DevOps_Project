const express = require("express");
const router = express.Router();
const fineController = require("../controllers/fineController");
const auth = require("../middlewares/auth");

// router.get("/", fineController.getAllFines);

// router.get("/get/:fineId", fineController.getFineById);

// router.post("/", fineController.createNewFine);

// router.put("/:fineId", fineController.updateOneFine);

// router.delete("/:fineId", fineController.deleteOneFine);

router.get("/", auth, async (req, res) => {
  await fineController.getAllFines();
});

router.get("/get/:fineId", auth, async (req, res) => {
  await fineController.getFineById();
});

router.post("/", auth, async (req, res) => {
  await fineController.createNewFine();
});

router.put("/:fineId", auth, async (req, res) => {
  await fineController.updateOneFine();
});

router.delete("/:fineId", auth, async (req, res) => {
  await fineController.deleteOneFine();
});

module.exports = router;
