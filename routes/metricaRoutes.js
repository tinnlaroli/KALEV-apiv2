const express = require('express');
const router = express.Router();
const metricaController = require('../controllers/metricaController');

/**
 * @swagger
 * /api/juegos/metricas:
 *   post:
 *     summary: Registrar las métricas del jugador en un juego
 *     description: Registra las métricas del jugador como puntuación, tiempo, intentos y progreso en un juego.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_juego:
 *                 type: string
 *               id_jugador:
 *                 type: string
 *               puntuacion:
 *                 type: integer
 *               tiempo_empleado:
 *                 type: string
 *                 format: time
 *               fecha_completado:
 *                 type: string
 *                 format: date
 *               intentos:
 *                 type: integer
 *               progreso_porcentaje:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Métrica registrada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Metrica'
 *       500:
 *         description: Error al registrar la métrica
 */

// Registrar una nueva métrica
router.post('/', metricaController.registrarMetrica);


/**
 * @swagger
 * /api/metricas/{id_jugador}:
 *   get:
 *     summary: Obtener las métricas de un jugador específico
 *     description: Obtiene las métricas de un jugador específico por su ID.
 *     parameters:
 *       - name: id_jugador
 *         in: path
 *         required: true
 *         description: ID del jugador
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Métricas del jugador
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Metrica'
 *       404:
 *         description: Métricas no encontradas
 */

// Obtener las métricas de un jugador
router.get('/:id_jugador', metricaController.getMetricasByJugador);

module.exports = router;