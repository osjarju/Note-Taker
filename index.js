//import express
const server = require('express');

//import routes 
const api = require("./routes/indexRoutes")

//port
const PORT = 3001;

//init app
const app = server();

//middleware
app.use(server.urlencoded());
app.use(server.json());
app.use("/api", api);

const printPort = () => {
    console.log(`listening to port ${PORT}`)
}

//listening to port
app.listen(PORT, printPort)