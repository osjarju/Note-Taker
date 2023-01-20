//import
const express = require("express").Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

express.get('/notes', (req, res) => {
    readFromFile('./db/fileName.json')
        .then((data) => res.json(JSON.parse(data)));
})

express.post('/notes', (req, res) => {
    const newPost = req.body.title;
    readAndAppend(newPost, './db/fileName.json',)
        .then((data) => res.json(JSON.stringify(data)));

})

//export
module.exports = express;