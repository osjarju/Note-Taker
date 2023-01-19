//const express = require("express");
const fileNameRoute = require("express").Router();
const fs = require("fs");

//GET REQUEST
fileNameRoute.get("/", (req, res) => {
    fs.readFile("./db/fileName.json", "utf-8", (err, data) => {
        if (err) {
            res.send("Error reading file")
        } else {
            let result = {
                data: JSON.parse(data)
            }
            res.json(result);
        }
    })
})

//POST REQUEST TO ADD
fileNameRoute.post("/post", (req, res) => {
    const receiveNamed = req.body.name
    console.log(receiveNamed)

    //read file
    fs.readFile("./db/fileName.json", "utf-8", (err, data) => {
        if (err) {
            res.send("Error reading file")
        } else {
            console.log(data);
            let modifyData = JSON.parse(data);
            console.log(modifyData);

            let newFileName = {
                name: receiveNamed,
                id: Math.random().toString(16).slice(2)
            }

            modifyData.push(newFileName)

            //write to file
            fs.writeFile("./db/fileName.json", JSON.stringify(modifyData), (err, data) => {
                if (err) {
                    res.send("Error writing to file")
                } else {
                    res.json({
                        data: modifyData,
                        lastAdded: newFileName
                    })
                }
            })

        }
    })

})

//DELETE REQUEST
fileNameRoute.delete("/post", (req, res) => {
    const idToDelete = req.body.id;
    fs.readFile("./db/fileName.json", "utf-8", (err, data) => {
        if (err) {
            res.send("Error reading file")
        } else {
            console.log(data);
            let modifyData = JSON.parse(data);
            console.log(modifyData);
            let indexToDelete = null;
            for (let i = 0; i < modifyData.length; i++) {
                if (modifyData[i].id === idToDelete) {
                    indexToDelete = i;
                }
            }
            if (indexToDelete !== null) {
                modifyData.splice(indexToDelete, 1);
            } else {
                res.send("id not found")
            }

            //write to file
            fs.writeFile("./db/fileName.json", JSON.stringify(modifyData), (err, data) => {
                if (err) {
                    res.send("Error writing to file")
                } else {
                    res.json(
                        {
                            data: modifyData
                        }
                    )
                }
            })
        }
    })
})

//UPDATES
fileNameRoute.put("/", (req, res) => {
    const idToUpdate = req.body.id;
    const UpdatedName = req.body.name;
    fs.readFile("./db/fileName.json", "utf-8", (err, data) => {
        if (err) {
            res.send("Error reading file")
        } else {
            console.log(data);
            let modifyData = JSON.parse(data);
            modifyData = modifyData.map(item => {
                if (item.id === idToUpdate) {
                    item.name = UpdatedName;
                    return item
                } else {
                    return item
                }
            })

            //write to file
            fs.writeFile("./db/fileName.json", JSON.stringify(modifyData), (err, data) => {
                if (err) {
                    res.send("Error writing to file")
                } else {
                    res.json(
                        {
                            data: modifyData
                        }
                    )
                }
            })
        }
    })
})


module.exports = fileNameRoute;