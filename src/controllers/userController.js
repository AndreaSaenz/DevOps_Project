const { Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");
const userService = require("../services/userServices");
const jwt = require("jsonwebtoken");

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
    const token = jwt.sign({ user: createdUser }, "secretKey");
    res.status(201).send({ status: "OK", data: createdUser, token: token });
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
    const token = jwt.sign({ user: user }, "secretKey");
    res.status(201).send({
      status: "Ok",
      message: "Welcome ",
      token: token,
    });
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