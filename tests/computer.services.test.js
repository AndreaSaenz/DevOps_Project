const computerService = require("../src/services/computerServices");
const computer = require("../src/models/Computer");

const sinon = require("sinon");

const result = {
  id: 1,
  Name: "001Computer",
  yearModel: 2015,
  memory: 5,
  monitorSize: "11pulgadas",
  ram: 12,
  processor: "Core i5",
};

describe("Test all loan services", () => {
  test("should call the service", () => {
    var spy = sinon.spy(computer, "findAll");
    computerService.getAllComputers();

    sinon.assert.calledOnce(spy);
  });

  test("should call the service", () => {
    var spy = sinon.spy(computer, "findByPk");
    computerService.getComputerById(result.id);

    sinon.assert.calledOnce(spy);
  });

  test("should call the service", () => {
    var spy = sinon.spy(computer, "findOne");
    computerService.createNewComputer(result);

    sinon.assert.calledOnce(spy);
  });

  test("should call the service", () => {
    var spy = sinon.spy(computer, "findByPk");
    computerService.updateOneComputer(result.id, { ram: 15 });

    sinon.assert.calledOnce(spy);
  });

  test("should call the service", () => {
    var spy = sinon.spy(computer, "findByPk");
    computerService.deleteOneComputer(result.id);

    sinon.assert.calledOnce(spy);
  });
});
