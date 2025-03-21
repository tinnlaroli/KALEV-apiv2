// routes/items.js
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemsController'); // Importamos el controlador

// Ruta para obtener todos los items
router.get('/', itemController.obtenerItems);

module.exports = router;
