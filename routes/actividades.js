const express = require('express');
const { obtenerActividades, obtenerActividadPorId } = require('../controllers/actividadesController');
const router = express.Router();

/**
 * @swagger
 * /actividades:
 *   get:
 *     summary: Obtener todas las actividades
 *     description: Devuelve una lista de todas las actividades registradas en la base de datos.
 *     responses:
 *       200:
 *         description: Lista de actividades obtenida correctamente.
 *       500:
 *         description: Error en el servidor.
 */
router.get('/', obtenerActividades);

/**
 * @swagger
 * /actividades/{id}:
 *   get:
 *     summary: Obtener detalles de una actividad específica
 *     description: Devuelve los detalles de una actividad específica según su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la actividad a obtener.
 *     responses:
 *       200:
 *         description: Actividad obtenida correctamente.
 *       404:
 *         description: Actividad no encontrada.
 *       500:
 *         description: Error en el servidor.
 */
router.get('/:id', obtenerActividadPorId);

module.exports = router;
