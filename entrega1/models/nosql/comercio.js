const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

const ComercioScheme = new mongoose.Schema(
    {
        name: {
            type: String
        },
        cif: {
            type: String
        },
        direccion: {
            type: String
        },
        email:{
            type: String
        },
        telefono:{
            type: String
        },
        id_pagina:{
            type: Number,
            unique: true
        }
    },
    {
        timestamp: true, // TODO createdAt, updatedAt
        versionKey: false
    }
)
ComercioScheme.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("comercio", ComercioScheme) // Nombre de la colección (o de la tabla en SQL)