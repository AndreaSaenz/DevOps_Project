const User = require("../models/User");

const registerNewUser = (newUser) => {
  const newUser = User.createNewUser(newUser);
  return newUser;
};

module.exports = {
  registerNewUser,
};
