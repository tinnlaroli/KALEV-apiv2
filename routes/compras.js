const express = require('express');
const router = express.Router();
const comprasController = require('../controllers/comprasController');

/**
 * @swagger
 * /compras:
 *   get:
 *     summary: Obtener todas las compras
 *     description: Retorna una lista de todas las compras registradas.
 *     responses:
 *       200:
 *         description: Lista de compras obtenida exitosamente
 *       500:
 *         description: Error al obtener compras
 */
router.get('/', comprasController.obtenerCompras);

router.get('/:id', comprasController.obtenerCompraPorId);
module.exports = router;

