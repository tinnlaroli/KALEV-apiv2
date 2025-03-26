const express = require('express');
const router = express.Router();
const JuegoController = require('../controllers/juegoController');
const  validarToken  = require('../middlewares/authMiddleware');

// Obtener todos los juegos
router.get('/', validarToken, JuegoController.obtenerTodos);

// Obtener un juego por ID
router.get('/:id', validarToken, JuegoController.obtenerPorId);

// Crear un nuevo juego
router.post('/',  validarToken,JuegoController.crear);

module.exports = router;
