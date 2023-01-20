//import
const express = require("express").Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

express.get('/notes', (req, res) => {
    readFromFile('./db/fileName.json')
        .then((data) => res.json(JSON.parse(data)));
})

express.post('/notes', (req, res) => {
    const newPost = req.body;
    if (req.body) {
        newPost = {
            express_id: uuid(),
        };

        readAndAppend(newPost, './db/fileName.json');
        res.json();
    } else {
        res.error('Error reading file');
    }
    newPost.push(newFileName);
    fs.writeFile("./db/fileName.json", JSON.stringify(newPost), (err, data) => {
        if (err) {
            res.send("Error writing to file")
        } else {
            res.json(
                {
                    data: newPost,
                    lastAdded: newFileName
                }
            )
        }
    })
});

//export
module.exports = express;