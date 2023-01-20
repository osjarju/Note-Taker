//import express
const express = require('express');

const path = require('path');

//import routes 
const api = require("./routes/indexRoutes")

//port
const PORT = 3001;

//init app
const app = express();

//middleware
app.use(express.urlencoded());
app.use(express.json());
app.use("/api", api);

app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

const printPort = () => {
    console.log(`listening to port ${PORT}`)
}

//listening to port
app.listen(PORT, printPort)