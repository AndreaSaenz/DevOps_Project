const express = require('express')
const loanRouter = require("./routes/loanRoutes"); 
const db = require("./database/config");
const app = express()

const PORT = 3000;

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

app.use("/loans", loanRouter);

app.listen(PORT, () => {
  console.log(`DevOps_Project listening on port ${PORT}`)
})