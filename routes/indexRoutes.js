//import
const express = require("express");

//acquire route files
const fileNameRoute = require("./fileNames");

const app = express();

//link routes to app
app.use("/fileName", fileNameRoute);

//export
module.exports = app;