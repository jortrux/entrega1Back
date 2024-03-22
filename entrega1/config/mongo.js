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