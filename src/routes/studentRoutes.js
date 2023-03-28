const express = require("express");
const router= express.Router();

var studentController = require('../controllers/studentController');

router.get("/", studentController.getAllStudents);

router.get("/:studentId", studentController.getStudentById);

router.post("/", studentController.createNewStudent);

router.put("/:studentId", studentController.updateOneStudent);

router.delete("/:studentId", studentController.deleteOneStudent);

module.exports = router;