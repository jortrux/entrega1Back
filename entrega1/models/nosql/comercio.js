//me defino el modelo comercio que contiene los siguientes atributos, que es lo mismo de siempre pero con los parametros pedidos
const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

const ComercioScheme = new mongoose.Schema(
    {
        nombre: {
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
        timestamp: true,
        versionKey: false
    }
)
ComercioScheme.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("comercio", ComercioScheme)