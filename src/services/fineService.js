const { Sequelize } = require("sequelize");
const Fine = require("../models/Fine");

const getAllFines = async () => {
  try {
    const allFines = await Fine.findAll();
    return allFines;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getFineById = async (fineId) => {
  try {
    const foundFine = await Fine.findByPk(fineId);
    if (!foundFine) {
      throw {
        status: 400,
        message: "Fine not found",
      };
    }
    return foundFine;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const createNewFine = async (newFine) => {
  try {
    const foundFine = await Fine.findOne({ where: { id: newFine.id } });
    console.log(foundFine);
    if (foundFine) {
      throw {
        status: 400,
        message: "Fine already exists.",
      };
    }
    const createdFine = Fine.create(newFine);
    return createdFine;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const updateOneFine = async (fineId, fineStatus) => {
  try {
    const updateFine = await Fine.findByPk(fineId);
    if (!updateFine) {
      throw {
        status: 400,
        message: "Fine already exists.",
      };
    }
    await updateFine.save(fineStatus);
    updateFine.reload();
    return foundFine;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const deleteOneFine = async (fineId) => {
  try {
    const fineToDelete = await Fine.findByPk(fineId);
    if (!fineToDelete) {
      throw {
        status: 400,
        message: "Fine already exists.",
      };
    }
    await fineToDelete.destroy();
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = {
  getAllFines,
  getFineById,
  createNewFine,
  updateOneFine,
  deleteOneFine,
};
