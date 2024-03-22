const express = require("express");
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controlers/comercio");
const { validatorGetItem, validatorCreateItem } = require("../validators/comercio");


// Creación de un nuevo router de Express para manejar las rutas específicas de "comercio".
const router = express.Router();

// Me defino las rutas para los metodos del controler de comercios.
// El ":cif" en la ruta indica que "cif" es un parámetro de ruta que se pasará a la función controladora.
// Se que se sabe pero dejo el comentario para acordarme porque se me va
router.get("/", getItems); 
router.get("/:cif", validatorGetItem, getItem); 
router.delete("/:cif", validatorGetItem, deleteItem);
router.put("/:cif", validatorGetItem, validatorCreateItem, updateItem);
router.post("/", validatorCreateItem, createItem);
module.exports = router;









//lo de clase para referencia.

// const express = require("express")
// const router = express.Router()
// const { getItems, getItem, createItem } = require("../controllers/tracks")
// const { validatorCreateItem } = require("../validators/tracks")
// const authMiddleware = require("../middleware/session")
// const checkRol = require("../middleware/rol")

// router.post("/", authMiddleware, checkRol(["admin"]), validatorCreateItem, createItem)
// router.post("/", authMiddleware , validatorCreateItem , createItem)
// router.post("/", validatorCreateItem, createItem)
// router.get("/", getItems)
// router.get("/:id", getItem)
// router.get("/", authMiddleware, getItems)
// module.exports = router