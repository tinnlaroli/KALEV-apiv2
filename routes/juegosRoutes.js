const express = require('express');
const router = express.Router();
const JuegoController = require('../controllers/juegoController');

// Obtener todos los juegos
router.get('/', JuegoController.obtenerTodos);

// Obtener un juego por ID
router.get('/:id', JuegoController.obtenerPorId);

// Crear un nuevo juego
router.post('/', JuegoController.crear);

module.exports = router;
