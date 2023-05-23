const express = require("express");
const router= express.Router();
var studentController = require('../controllers/studentController');
const verifyToken = require("../middlewares/auth");

router.get("/", verifyToken, studentController.getAllStudents);

router.get("/:studentId", verifyToken, studentController.getStudentById);

router.post("/", verifyToken, studentController.createNewStudent);

router.put("/:studentId", verifyToken, studentController.updateOneStudent);

router.delete("/:studentId", verifyToken, studentController.deleteOneStudent);


module.exports = router;