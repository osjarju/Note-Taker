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

express.delete('/notes', (req, res) => {
  console.log(req.body);
  const { title, text, id } = req.body;
  if (req.body) {
    const noteToDelete = {
      title,
      text,
      id
    };

    readFromFile(noteToDelete, './db/fileName.json');
    res.json('Note deleted successfully');
  } else {
    res.send('Error deleting file');
  }
});

express.put('./notes', (req, res) => {
  console.log(req.body);
  const { title, text, id } = req.body;
  if (req.body) {
    const noteToAdd = {
      title,
      text,
      id
    };

    writeToFile(noteToAdd, './db/fileName,json');
    res.json('Note added successfuly');
  } else {
    res.send('Error adding file');
  }
});

module.exports = express;