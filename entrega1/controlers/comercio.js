const { comercioModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require('express-validator');

// Me hago esta funcion para no tener que estar poniendo el try y catch todo el rato
const errorHandler = async (req, res, operation) => {
    try {
        return await operation();
    } catch (err) {
        console.error(err);
        handleHttpError(res, `ERROR_${operation.name.toUpperCase()}`, 404);
    }
};

// Controlador para obtener todos los comercios. Puede incluir un criterio de ordenación.
const getItems = (req, res) => errorHandler(req, res, async () => {
    let query = comercioModel.find();
    // Si se especifica un orden para el campo CIF, lo aplica.
    if (req.query.sortByCIF === 'asc') {
        query = query.sort({ cif: 1 });
    }
    // Ejecuta la consulta y envía los resultados.
    const data = await query.exec();
    res.send(data);
});

// Controlador para obtener un comercio específico por su CIF.
const getItem = (req, res) => errorHandler(req, res, async () => {
    const { cif } = matchedData(req); // Extrae y valida los datos del request.
    const data = await comercioModel.findOne({ cif });
    // Si no encuentra el comercio, envía un error.
    if (!data) {
        return handleHttpError(res, 'COMMERCE_NOT_FOUND', 404);
    }
    res.send(data); // Envía los datos del comercio encontrado.
});

// Controlador para crear un nuevo comercio.
const createItem = (req, res) => errorHandler(req, res, async () => {
    const body = matchedData(req); // Valida los datos del request.
    const data = await comercioModel.create(body); // Crea el comercio con los datos validados.
    console.log(data); // Registra el comercio creado.
    res.send(data); // Envía los datos del comercio creado.
});

// Controlador para actualizar un comercio existente por su CIF.
const updateItem = (req, res) => errorHandler(req, res, async () => {
    const { cif, ...body } = matchedData(req); // Extrae el CIF y el resto de datos del body del request.
    const updatedCommerce = await comercioModel.findOneAndUpdate({ cif }, body, { new: true });
    // Si no encuentra el comercio a actualizar, envía un error.
    if (!updatedCommerce) {
        return handleHttpError(res, 'COMMERCE_NOT_FOUND', 404);
    }
    res.send(updatedCommerce); // Envía los datos del comercio actualizado.
});

// Controlador para eliminar un comercio por su CIF. Soporta eliminación lógica mediante un parámetro.
const deleteItem = (req, res) => errorHandler(req, res, async () => {
    const { cif } = matchedData(req); // Valida el CIF recibido en el request.
    let result;
    // Decide entre eliminación lógica o física basándose en un parámetro del query.
    if (req.query.logical === 'true') {
        result = await comercioModel.findOneAndUpdate({ cif }, { deleted: true }, { new: true });
    } else {
        result = await comercioModel.findOneAndDelete({ cif });
    }
    res.send(result); // Envía el resultado de la operación de eliminación.
});

// Exporta los controladores para ser utilizados en las rutas.
module.exports = {
    getItems, getItem, createItem, updateItem, deleteItem
};
