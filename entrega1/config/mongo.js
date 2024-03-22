// lo clasico, para conectarse a la base de datos de mongo, DB_URI en el env a mi atlas como dato destacable pero no hay mucho que comentar aqui
const mongoose = require('mongoose')
const dbConnect = () => {
    const db_uri = process.env.DB_URI
    mongoose.set('strictQuery', false)
    try{
        mongoose.connect(db_uri)
    }catch(error){
            console.error("Error conectando a la DB:", error)
    }
    mongoose.connection.on("connected",() => console.log("Conectdo a la BD"))
}
module.exports = dbConnect