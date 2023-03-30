const express = require('express');
const db = require("./database/config");
const app = express();

const PORT = 3000;

const userListRouter = require("./routes/userRoutes");
const studentRouter = require("./routes/studentRoutes"); 
const computerRouter = require("./routes/computerRoutes");
const loanRouter = require("./routes/loanRoutes"); 
const finesListRouter = require("./routes/fineRoutes");

(async () => {
  try {
    await db.authenticate();
    await db.sync({ alter: true });
    console.log("Connection with database successful");
  } catch (error) {
    throw error;
  }
})()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.send("Hello world");
});

app.use("/user", userListRouter);
app.use("/students", studentRouter);
app.use("/computers", computerRouter);
app.use("/loans", loanRouter);
app.use("/fines", finesListRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
})

app.listen(PORT, () => {
  console.log(`DevOps_Project listening on port ${PORT}`)
})