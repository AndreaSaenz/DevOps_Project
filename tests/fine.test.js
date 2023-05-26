const fineController = require("../src/controllers/fineController");
const fineService = require("../src/services/fineServices");
const fine = require("../src/models/Fine");

jest.mock("../src/services/fineServices");

describe("Test all fines endpoints", () => {
  it("Should call fine service", async () => {
    const result = [
      {
        id: 1,
        monto: 150,
        observacion: "Equipo roto",
        folioSolicitud: 2,
        estado: false,
      },
    ];
    const spy = jest
      .spyOn(fineService, "getAllFines")
      .mockImplementation(() => result);
    expect(await fineController.getAllFines()).toBe(spy);
  });
});
