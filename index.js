const express = require('express');
var cors = require("cors");
const userRoute = require('./routes/userRoute');
const connectToServer = require('./config/db');
const doctorRoute = require('./routes/doctorRoute');
// require('dotenv').config();



const app = express()

app.use(cors())

app.use(express.json())

app.get("/", (req,res)=>{
    res.send("Welcome to Mock-5 Backend Server")
})

app.use("/user", userRoute)

app.use("/doctor", doctorRoute)


app.listen(8080, connectToServer())



