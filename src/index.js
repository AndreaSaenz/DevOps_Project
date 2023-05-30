const express = require("express");
const db = require("./database/config");
const app = express();
const logger = require("./logger");
const cors= require('cors')

const PORT = 3000;

const userRouter = require("./routes/userRoutes");
const studentRouter = require("./routes/studentRoutes");
const computerRouter = require("./routes/computerRoutes");
const loanRouter = require("./routes/loanRoutes");
const fineRouter = require("./routes/fineRoutes");

(async () => {
  try {
    await db.authenticate();
    await db.sync({ alter: true });
    console.log("Connection with database successful");
  } catch (error) {
    throw error;
  }
})();

app.use(cors({ 
  origin: ['http://localhost:4200'], 
  credentials: true, 
  methods: 'GET, POST, PUT, DELETE, OPTIONSs', 
  allowedHeaders: 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method' 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.json("Hello world");
});

app.use("/user", userRouter);
app.use("/students", studentRouter);
app.use("/computers", computerRouter);
app.use("/loans", loanRouter);
app.use("/fines", fineRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(PORT, () => {
  logger.info(`DevOps_Project listening on port ${PORT}`);
});
