const studentController = require("../src/controllers/studentController");
const studentService = require("../src/services/studentServices");
const student = require("../src/models/Student");

const sinon = require("sinon");
const result = {
  id: 1,
  Name: "Jane Doe",
  email: "janeDoe@testing.com",
  telefono: "999-999-9999",
  liceniatura: "Derecho",
  semestre: 5,
};

describe("Test all students controllers", () => {
  test("should call the controller", () => {
    var spy = sinon.spy(studentService, "getAllStudents");
    studentController.getAllStudents();

    sinon.assert.calledOnce(spy);
  });

  test("should call the controller", () => {
    var spy = sinon.spy(studentService, "getStudentById");
    studentController.getStudentById(result.id);

    sinon.assert.calledOnce(spy);
  });

  test("should call the controller", () => {
    var spy = sinon.spy(studentService, "createNewStudent");
    studentController.createNewStudent(result.id);

    sinon.assert.calledOnce(spy);
  });

  test("should call the controller", () => {
    var spy = sinon.spy(studentService, "updateOneStudent");
    studentController.updateOneStudent(result.id, { estado: true });

    sinon.assert.calledOnce(spy);
  });

  test("should call the controller", () => {
    var spy = sinon.spy(studentService, "deleteOneStudent");
    studentController.deleteOneStudent(result.id);

    sinon.assert.calledOnce(spy);
  });
});
