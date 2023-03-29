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
    const token = jwt.sign({ id: newUser.id }, process.env.TOKEN_KEY);
    // save user token
    createdUser.token = token;

    // return new user
    res.status(201).json(user);
    return createdUser;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const logInUser = async (username, password) => {
  try {
    const foundUser = await User.findOne({ where: { userName: username } });
    if (foundUser && (await bcrypt.compare(password, foundUser.password))) {
      const token = jwt.sign({ id: foundUser.id }, process.env.TOKEN_KEY);
    }
    foundUser.token = token;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = {
  registerNewUser,
  logInUser,
};
