//import express
const express = require('express');

const path = require('path');

//import routes 
const api = require("./routes/indexRoutes")

//port
const PORT = process.env.PORT || 3001;

//init app
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use("/api", api);

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

const printPort = () => {
    console.log(`listening to port ${PORT}`)
}

//listening to port
app.listen(PORT, printPort)