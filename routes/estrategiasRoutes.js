const express = require('express');
const router = express.Router();
const EstrategiaController = require('../controllers/estrategiaController');

// Obtener todas las estrategias
router.get('/', EstrategiaController.obtenerTodas);

// Obtener una estrategia por ID
router.get('/:id', EstrategiaController.obtenerPorId);

// Crear una nueva estrategia
router.post('/', EstrategiaController.crear);

module.exports = router;
