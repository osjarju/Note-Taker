//Imports
const server = require('express');
const fs = require('fs');
let filenameDb = require("./db/fileName.json")

//port
const PORT = 3001;

//init app
const app = server();

//middlewares
app.use(server.urlencoded());
app.use(server.json());

//GET REQUEST
app.get('/api/filename', (req, res) => {
    let result = {
        data: filenameDb
    }
    res.json(result)
})

//POST REQUEST TO ADD
app.post("/api/filename/post", (req, res) => {
    console.log(req.body)
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
            modifyData.push({
                name: receiveNamed,
                id: Math.random().toString(16).slice(2)
            })
            res.json(modifyData)
        }
    })

})

const printPort = () => {
    console.log(`listening to port ${PORT}`)
}

//listening to port
app.listen(PORT, printPort)