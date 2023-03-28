const { Sequelize } = require("sequelize");
const User = require("../models/User");

const registerNewUser = async (newUser) => {
  try {
    const foundUser = await User.findOne({ where: { email: newUser.email } });
    if (foundUser) {
      throw {
        status: 400,
        message: "User already registered",
      };
    }
    const createdUser = await User.create(newUser);
    return createdUser;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = {
  registerNewUser,
};
