//imports
const express = require("express").Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuidv1 = require('uuid/v1');


//GET Route 
express.get('/notes', (req, res) => {
  readFromFile('./db/fileName.json')
    .then((data) => res.json(JSON.parse(data)));
});

//POST Route 
express.post('/notes', (req, res) => {
  console.log(req.body);
  const { title, text } = req.body;
  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv1(),
    };

    readAndAppend(newNote, './db/fileName.json');
    res.json(`Note added successfully`);
  } else {
    res.send('Error reading file');
  }

});

express.delete('/notes/:id', (req, res) => {
  console.log(req.query)
  const noteToDelete = req.params.id;
  readFromFile('./db/fileName.json')
    .then((data) => {
      let tempData = JSON.parse(data)
      tempData = tempData.filter(note => note.id != noteToDelete)
      console.log(tempData)
      writeToFile('./db/fileName.json', tempData)
      res.json(tempData)
    })
});

module.exports = express;