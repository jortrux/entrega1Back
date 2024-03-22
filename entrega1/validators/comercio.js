const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator.js");

//compruebo que los elementos del modelo no estan vacios y me aseguro de que el id no es numerico
const validatorCreateItem = [
    check("nombre").exists().notEmpty(),
    check("cif").exists().notEmpty(),
    check("direccion").exists().notEmpty(),
    check("email").exists().notEmpty(),
    check("telefono").exists().notEmpty(),
    check("id_pagina").exists().notEmpty().isNumeric(),
    (req, res, next) => validateResults(req, res, next)
];

// me aseguro de que existe el comercio que estoy buscando comprobando que el cif existe antes de devolverlo
const validatorGetItem = [
    check("cif").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

// si el cif no esta vacio y dependiendo de si el borrado es logico o no, lo borro
const validatorDeleteItem = [
    check("cif").exists().notEmpty(),
    check("logical").exists().notEmpty().isBoolean(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]
module.exports = { validatorCreateItem, validatorGetItem, validatorDeleteItem }
