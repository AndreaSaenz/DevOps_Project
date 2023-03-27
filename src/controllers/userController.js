const userService = require("../services/userService");

const register = (req, res) => {
  const { body } = req;

  if (!(body.userName && body.email && body.password)) {
    res.status(409).send("Inputs: User name, email and password are required");
  }

  //check if email has already been registered

  //encrypt password

  //Date created
  const today = getDate();

  const newUser = {
    userName: body.userName,
    email: body.email,
    //password: encriptedpass,
    lastLoginDate: today,
    createdDate: today,
  };
  const createdUser = userService.registerNewUser(newUser);
  res.status(201).send({ status: "OK", data: createdUser });
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

  today = month + "-" + day + "-" + year;
  return today;
}

module.exports = {
  register,
  logIn,
};
