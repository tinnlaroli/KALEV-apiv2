const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController'); // Asegúrate de que esta ruta sea correcta

// Ruta para obtener todos los items
router.get('/', itemsController.obtenerItems);

// Ruta para obtener un item por ID
router.get('/:id', itemsController.obtenerItemPorId);

module.exports = router;
