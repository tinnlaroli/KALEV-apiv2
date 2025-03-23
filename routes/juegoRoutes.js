const express = require('express');
const router = express.Router();
const { obtenerJuegos, obtenerJuegoPorId } = require('../controllers/juegoController');
/**
 * @swagger
 * /api/juegos:
 *   get:
 *     summary: Obtener todos los juegos disponibles
 *     description: Retorna una lista de todos los juegos disponibles.
 *     responses:
 *       200:
 *         description: Lista de juegos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Juego'
 */

// Obtener todos los juegos disponibles
router.get('/', obtenerJuegos);

/**
 * @swagger
 * /api/juegos/{id}:
 *   get:
 *     summary: Obtener detalles de un juego específico
 *     description: Obtiene los detalles de un juego específico por su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del juego
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles del juego
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Juego'
 *       404:
 *         description: Juego no encontrado
 */

// Obtener un juego por su ID
router.get('/:id', obtenerJuegoPorId);

module.exports = router;

