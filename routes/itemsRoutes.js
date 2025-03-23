const express = require('express');
const router = express.Router();
const ItemsController = require('../controllers/itemsController');

// Obtener todos los ítems
router.get('/', ItemsController.obtenerTodos);

// Obtener un ítem por ID
router.get('/:id', ItemsController.obtenerPorId);

// Crear un nuevo ítem
router.post('/', ItemsController.crear);

module.exports = router;
