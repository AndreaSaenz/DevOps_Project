/*const Server = require('./models/server');
const server = new Server();

server.listen();*/


/*const express = require('express');
const app = express();



app.listen(3000, () => {
    console.log('server on port 3000.')
})*/

const express = require('express')
const studentRouter = require("./routes/studentRoutes"); 
const db = require("./database/config");
const app = express()

const PORT = 3000;

(async () => {
  try {
    await db.authenticate();
    await db.sync( { alter: true } );
    console.log("Connection with database successful");
  } catch (error) {
    throw error;
  }
})()

app.use(express.json());

app.use("/students", studentRouter);

app.listen(PORT, () => {
  console.log(`DevOps_Project listening on port ${PORT}`)
})