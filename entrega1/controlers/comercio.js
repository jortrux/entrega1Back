const { comercioModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require('express-validator');

// Me hago esta funcion para no tener que estar poniendo el try y catch todo el rato
// Me he sentido muy inteligente haciendo esto pero son las 4am e igual no es para tanto JAJAAJ
const errorHandler = async (req, res, operation) => {
    try {
        return await operation();
    } catch (err) {
        console.error(err);
        handleHttpError(res, `ERROR_${operation.name.toUpperCase()}`, 404);
    }
};

// funcion para recibir todos los comercios
const getItems = (req, res) => errorHandler(req, res, async () => {
    let query = comercioModel.find();
    //esto es para filtrar el CIF  (ayuda de dario)
    if (req.query.sortByCIF === 'asc') {
        query = query.sort({ cif: 1 });
    }
    const data = await query.exec();
    res.send(data);
});

// devolver un comercio especifico por cif
const getItem = (req, res) => errorHandler(req, res, async () => {
    const { cif } = matchedData(req);
    const data = await comercioModel.findOne({ cif });
    if (!data) {
        return handleHttpError(res, 'COMMERCE_NOT_FOUND', 404);
    }
    res.send(data);
});

// creo comercios
const createItem = (req, res) => errorHandler(req, res, async () => {
    const body = matchedData(req);
    const data = await comercioModel.create(body);
    res.send(data);
});

// actualizar
const updateItem = (req, res) => errorHandler(req, res, async () => {
    const { cif, ...body } = matchedData(req);
    //busco el comercio a actualizar con el cif
    const updatedCommerce = await comercioModel.findOneAndUpdate({ cif }, body, { new: true });
    if (!updatedCommerce) {
        return handleHttpError(res, 'COMMERCE_NOT_FOUND', 404);
    }
    res.send(updatedCommerce);
});

// Eliminar comercios
const deleteItem = (req, res) => errorHandler(req, res, async () => {
    const { cif } = matchedData(req); // Valida el CIF recibido en el request.
    let result;
    // el logico no borra de la base de datos, pero lo marca como eliminado, importante tener encuenta porque no me deja hacer un post con el mismo id si uso el logico
    //seguramente el comentaro no va aqui pero me da igual
    if (req.query.logical === 'true') {
        result = await comercioModel.findOneAndUpdate({ cif }, { deleted: true }, { new: true });
    } else {
        result = await comercioModel.findOneAndDelete({ cif });
    }
    res.send(result);
});

module.exports = {
    getItems, getItem, createItem, updateItem, deleteItem
};
