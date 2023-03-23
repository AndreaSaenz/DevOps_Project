const express = require("express");
const router = express.Router();

router.get("/", function (request, response, next) {
  try {
    response.send("Here are the list of all the fines");
  } catch (error) {
    console.error("Error while getting fines list", error.message);
    next(error);
  }
});

module.exports = router;
