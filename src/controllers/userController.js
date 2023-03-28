const { Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");
const userService = require("../services/userService");

const register = (req, res) => {
  const { body } = req;

  if (!(body.userName && body.email && body.password)) {
    res.status(409).json({
      status: "FAILED",
      data: { error: "Some parameters are missing" },
    });
  }

  //encrypt password
  encryptedPassword = bcrypt.hash(password, 10);

  //Date created
  const today = getDate();

  try {
    const newUser = {
      userName: body.userName,
      email: body.email,
      password: encriptedPassword,
      lastLoginDate: today,
      createdDate: today,
    };
    const createdUser = userService.registerNewUser(newUser);
    res.status(201).send({ status: "OK", data: createdUser });
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const logIn = (req, res) => {
  const { body } = req;

  if (!(body.userName && body.password)) {
    res.status(400).send("User name and password are required");
  }
};

function getDate() {
  var today = new Date();
  var day = String(today.getDate());
  var month = String(today.getMonth() + 1);
  var year = String(today.getFullYear());

  today = year + "-" + month + "-" + day;
  return today;
}

module.exports = {
  register,
  logIn,
};
