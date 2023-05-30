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

describe("Test all students services", () => {
  test("should call the service", () => {
    var spy = sinon.spy(student, "findAll");
    studentService.getAllStudents();

    sinon.assert.calledOnce(spy);
  });

  test("should call the service", () => {
    var spy = sinon.spy(student, "findByPk");
    studentService.getStudentById(result.id);

    sinon.assert.calledOnce(spy);
  });

  test("should call the service", () => {
    var spy = sinon.spy(student, "create");
    studentService.createNewStudent(result.id);

    sinon.assert.calledOnce(spy);
  });

  test("should call the service", () => {
    var spy = sinon.spy(student, "update");
    studentService.updateOneStudent(result.id, { semestre: 9 });

    sinon.assert.calledOnce(spy);
  });

  test("should call the service", () => {
    var spy = sinon.spy(student, "findByPk");
    studentService.deleteOneStudent(result.id);

    sinon.assert.calledOnce(spy);
  });
});
