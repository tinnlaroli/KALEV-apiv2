const express = require('express');
const router = express.Router();
const SesionJuegoController = require('../controllers/sesionJuegoController');

// Obtener todas las sesiones de un jugador
router.get('/:id_jugador', SesionJuegoController.obtenerPorJugador);

// Registrar una nueva sesión de juego
router.post('/', SesionJuegoController.crear);

module.exports = router;
