const express = require("express");
const app = express();
const port = 3000;
const finesListRouter = require("./routes/fineRoutes");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.send("Hello world");
});

app.use("/fines", finesListRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log("Testing fines at port " + port);
});
