const { Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");
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

const logInUser = async (username, password) => {
  try {
    const foundUser = await User.findOne({ where: { userName: username } });
    if (foundUser && (await bcrypt.compare(password, foundUser.password))) {
    }
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = {
  registerNewUser,
  logInUser,
};
