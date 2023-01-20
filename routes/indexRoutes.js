//import
const express = require("express");

const notes = require('../notes.json');

//acquire route files
const fileNameRoute = require("./fileNames");

const app = express();

app.get('/notes', (req, res) => {
    res.json(notes)
})

app.post('/notes', (req, res) => {
    console.log(req.body)
    res.json(notes)
})

//link routes to app
app.use("/fileName", fileNameRoute);

//export
module.exports = app;