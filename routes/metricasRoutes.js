const express = require('express');
const router = express.Router();
const MetricaController = require('../controllers/metricaController');

// Obtener métricas por jugador
router.get('/:id_jugador', MetricaController.obtenerPorJugador);

// Registrar nueva métrica
router.post('/', MetricaController.crear);

module.exports = router;
