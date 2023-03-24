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

router.get("/:id", function (request, reponse, next) {
  try {
  } catch (error) {
    console.error("Error in the GET BY ID method in fines");
    next(error);
  }
});

router.post("/", function (request, response, next) {
  try {
    response.send("Here is the POST method of fines");
  } catch (error) {
    console.error("Error in the POST method of fines", error.message);
    next(error);
  }
});

router.put("/:id", function (request, response, next) {
  try {
  } catch (error) {
    console.error("Error in the PUT method of fines", error.message);
    next(error);
  }
});

router.delete("/:id", function (request, response, next) {
  try {
  } catch (error) {
    console.error("Error in the DELETE method of fines", error.message);
    next(error);
  }
});

module.exports = router;
