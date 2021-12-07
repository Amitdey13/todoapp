const express = require('express')
const cors = require('cors')
let bodyParser = require("body-parser");


const app = express()
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const dates = require("./router/task")
app.use("/task", dates)


const port= process.env.PORT || 5000
app.listen(port, ()=>console.log("connected to server"))