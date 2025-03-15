const express = require('express');
const { obtenerActividades } = require('../controllers/actividadesController');
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

module.exports = router;
