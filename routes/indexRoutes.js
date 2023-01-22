//import
const express = require("express").Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuidv1 = require('uuid/v1');

express.get('/notes', (req, res) => {
    readFromFile('./db/fileName.json')
        .then((data) => res.json(JSON.parse(data)));
})

express.post('/notes', (req, res) => {
    let newPost = req.body;
    if (req.body) {
        newPost = {
            express_id: uuidv1(),
        };
        return uuidv1;

        readAndAppend(newPost, './db/fileName.json');
        res.json();
    } else {
        res.send('Error reading file');
    }

})


// newPost.push(newFileName);
// fs.writeFile("./db/fileName.json", JSON.stringify(newPost), (err, data) => {
//         if (err) {
//             res.send("Error writing to file")
//         } else {
//             res.json(
//                 {
//                     data: newPost,
//                     lastAdded: newFileName
//                 }
//             )
//         }
//     })
// });

//export
module.exports = express;