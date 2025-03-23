const express = require('express');
const router = express.Router();
const { registrarNuevaSesionJuego, obtenerSesionesPorJugador } = require('../controllers/sesionJuegoController');
/**
 * @swagger
 * /api/sesiones_juego:
 *   post:
 *     summary: Registrar una sesión de juego
 *     description: Registra una sesión de juego con los datos del jugador, juego y sesión.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_jugador:
 *                 type: string
 *               id_juego:
 *                 type: string
 *               fecha:
 *                 type: string
 *                 format: date-time
 *               duracion_juego:
 *                 type: string
 *                 format: time
 *               intentos:
 *                 type: integer
 *               monedas_ganadas:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Sesión de juego registrada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SesionJuego'
 *       500:
 *         description: Error al registrar la sesión de juego
 */

// Registrar una nueva sesión de juego
router.post('/', registrarNuevaSesionJuego);

/**
 * @swagger
 * /api/sesiones_juego/{id_jugador}:
 *   get:
 *     summary: Obtener todas las sesiones de juego de un jugador
 *     description: Obtiene todas las sesiones de juego de un jugador específico.
 *     parameters:
 *       - name: id_jugador
 *         in: path
 *         required: true
 *         description: ID del jugador
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sesiones de juego del jugador
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SesionJuego'
 *       404:
 *         description: Sesiones no encontradas
 */

// Obtener todas las sesiones de juego de un jugador
router.get('/:id_jugador', obtenerSesionesPorJugador);

module.exports = router;
