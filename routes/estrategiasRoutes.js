const express = require('express');
const router = express.Router();
const EstrategiaController = require('../controllers/estrategiaController');
const  validarToken  = require('../middlewares/authMiddleware');

// Obtener todas las estrategias
router.get('/',  validarToken,EstrategiaController.obtenerTodas);

// Obtener una estrategia por ID
router.get('/:id', validarToken,EstrategiaController.obtenerPorId);

// Crear una nueva estrategia
router.post('/',  validarToken,EstrategiaController.crear);

module.exports = router;
