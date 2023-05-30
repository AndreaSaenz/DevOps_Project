const loanService = require("../src/services/loanServices");
const loan = require("../src/models/Loan");

const sinon = require("sinon");

const result = {
  folio: 1,
  estado: true,
  fechaEstipuladaDev: "2023-03-30T04:10:20.000Z",
  fechaRealDev: "2023-03-30T04:10:20.000Z",
  observacion: "Ok",
};

describe("Test all loan services", () => {
  test("should call the service", () => {
    var spy = sinon.spy(loan, "findAll");
    loanService.getAllLoans();

    sinon.assert.calledOnce(spy);
  });

  test("should call the service", () => {
    var spy = sinon.spy(loan, "findByPk");
    loanService.getLoanById(result.folio);

    sinon.assert.calledOnce(spy);
  });

  test("should call the service", () => {
    var spy = sinon.spy(loan, "findOne");
    loanService.createNewLoan(result);

    sinon.assert.calledOnce(spy);
  });

  test("should call the service", () => {
    var spy = sinon.spy(loan, "findByPk");
    loanService.updateOneLoan(result.folio, { estado: true });

    sinon.assert.calledOnce(spy);
  });

  test("should call the service", () => {
    var spy = sinon.spy(loan, "findByPk");
    loanService.deleteOneLoan(result.folio);

    sinon.assert.calledOnce(spy);
  });
});
