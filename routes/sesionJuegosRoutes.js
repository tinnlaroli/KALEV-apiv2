const express = require('express');
const router = express.Router();
const SesionJuegoController = require('../controllers/sesionJuegoController');
const  validarToken  = require('../middlewares/authMiddleware');

// Obtener todas las sesiones de un jugador
router.get('/:id_jugador', validarToken, SesionJuegoController.obtenerPorJugador);

// Registrar una nueva sesión de juego
router.post('/', validarToken, SesionJuegoController.crear);

module.exports = router;
