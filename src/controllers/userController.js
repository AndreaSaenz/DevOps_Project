const { Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");
const userService = require("../services/userService");

const register = async (req, res) => {
  const { body } = req;

  if (!(body.userName && body.email && body.password)) {
    res.status(409).json({
      status: "FAILED",
      data: { error: "Some parameters are missing" },
    });
  }

  //encrypt password
  encryptedPassword = await bcrypt.hash(body.password, 10);

  try {
    const newUser = {
      userName: body.userName,
      email: body.email,
      password: encryptedPassword,
    };
    const createdUser = await userService.registerNewUser(newUser);
    res.status(201).send({ status: "OK", data: createdUser.token });
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const logIn = async (req, res) => {
  const { body } = req;
  if (!(body.userName && body.password)) {
    res.status(400).send("User name and password are required");
  }
  try {
    const user = await userService.logInUser(body.userName, body.password);
    res
      .status(201)
      .send({ status: "OK", message: "Welcome " + user.userName, data: user });
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  register,
  logIn,
};
