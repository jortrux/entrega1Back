const express = require("express");
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controlers/comercio");
const { validatorGetItem, validatorCreateItem } = require("../validators/comercio");

const router = express.Router();

router.get("/", getItems); 
router.get("/cif", validatorGetItem, getItem); 

router.delete("/cif", validatorGetItem, deleteItem);

router.put("/cif", validatorGetItem, validatorCreateItem, updateItem);

router.post("/", validatorCreateItem, createItem);

module.exports = router;