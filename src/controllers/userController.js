const { Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");
const userService = require("../services/userServices");
const jwt = require("jsonwebtoken");
const MaskData = require("maskdata");
const logger = require("../logger");

const register = async (req, res) => {
  const { body } = req;

  if (!(body.userName && body.email && body.password)) {
    res.status(409).json({
      status: "FAILED",
      data: { error: "Some parameters are missing" },
    });
    logger.warn("MISSING SOME BODY ELEMENTS");
  }

  encryptedPassword = await bcrypt.hash(body.password, 10);

  try {
    const newUser = {
      userName: body.userName,
      email: body.email,
      password: encryptedPassword,
    };

    const createdUser = await userService.registerNewUser(newUser);
    const token = jwt.sign({ user: createdUser }, "secretKey");
    const maskPassword = MaskData.maskPassword(body.password);
    const maskedEmail = MaskData.maskEmail2(body.email);

    res.status(201).send({ status: "OK", data: createdUser, token: token });
    logger.info(
      `VERB: ${req.method}; QUERY_PARAMS: ${req.params}; HEADERS: Authorization: ${req.headers.authorization}`
    );
    logger.debug(
      `Method: registerNewUser; Query_Method: create(); URL: ${req.originalUrl}; BODY: {{userName: ${body.userName}, email: ${maskedEmail}, password: ${maskPassword}}`
    );
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
    logger.error(error);
  }
};

const logIn = async (req, res) => {
  const { body } = req;
  if (!(body.userName && body.password)) {
    res.status(400).send("User name and password are required");
    logger.warn("MISSING SOME BODY ELEMENTS");
  }
  try {
    const user = await userService.logInUser(body.userName, body.password);
    const token = jwt.sign({ user: user }, "secretKey");
    res.status(201).send({
      status: "Ok",
      message: "Welcome ",
      token: token,
    });
    const maskPassword = MaskData.maskPassword(body.password);
    logger.info(
      `VERB: ${req.method}; QUERY_PARAMS: ${req.params}; HEADERS: Authorization: ${req.headers.authorization}`
    );
    logger.debug(
      `Method: logInUser; Query_Method: findOne(); URL: ${req.originalUrl}; BODY: {{userName: ${body.userName}, password: ${maskPassword}}}`
    );
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
    logger.error(error);
  }
};

module.exports = {
  register,
  logIn,
};
