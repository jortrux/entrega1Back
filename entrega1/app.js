const express = require("express")
const cors = require("cors")
const dbConnect = require('./config/mongo')
require('dotenv').config();
const app = express()

app.use(cors())
app.use(express.json())

app.use("/api", require("./routes"))    

const port = process.env.PORT || 3000

app.listen(port, () => {
 console.log("Servidor escuchando en el puerto " + port)
})

dbConnect()