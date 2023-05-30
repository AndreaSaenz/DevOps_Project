const studentController = require("../src/controllers/studentController");
const studentService = require("../src/services/studentServices");
const student = require("../src/models/Student");

jest.mock("../src/services/studentServices");

describe("Test all students endpoints", () => {
  it("Should call student service", async () => {
    const result = [
      {
        id: 1,
        Name: "Jane Doe",
        email: "janeDoe@testing.com",
        telefono: "999-999-9999",
        liceniatura: "Derecho",
        semestre: 5,
      },
      {
        id: 2,
        Name: "John Doe",
        email: "johnDoe@testing.com",
        telefono: "999-999-9991",
        liceniatura: "Medicina",
        semestre: 6,
      },
    ];
    const spy = jest
      .spyOn(studentService, "getAllStudents")
      .mockImplementation(() => result);
    expect(await studentController.getAllStudents()).toBe(spy);
  });

  // const spy = jest.spyOn;
  // jest
  //   .spyOn(studentService, "getAllStudents")
  //   .mockImplementation(() => result);
  // expect(await studentController.getAllStudents()).toBe(result);
});
