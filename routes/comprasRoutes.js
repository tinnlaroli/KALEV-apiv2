const express = require('express');
const router = express.Router();
const ComprasController = require('../controllers/comprasController');

// Obtener todas las compras
router.get('/', ComprasController.obtenerTodas);

// Obtener una compra por ID
router.get('/:id', ComprasController.obtenerPorId);

// Registrar una nueva compra
router.post('/', ComprasController.crear);

module.exports = router;
