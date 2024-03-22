const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator.js");

const validatorCreateItem = [
    check("nombre").exists().notEmpty(),
    check("cif").exists().notEmpty(),
    check("direccion").exists().notEmpty(),
    check("email").exists().notEmpty(),
    check("telefono").exists().notEmpty(),
    check("id_pagina").exists().notEmpty().isNumeric(),
    (req, res, next) => validateResults(req, res, next)
];

const validatorGetItem = [
    check("cif").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorDeleteItem = [
    check("cif").exists().notEmpty(),
    check("logical").exists().notEmpty().isBoolean(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]
module.exports = { validatorCreateItem, validatorGetItem, validatorDeleteItem }
