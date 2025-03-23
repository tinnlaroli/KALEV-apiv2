const express = require('express');
const { EstrategiaController, HistorialController } = require('../controllers/estrategiaController');

const router = express.Router();

// Rutas GET
router.get('/estrategias_ensenanza', EstrategiaController.obtenerEstrategias); // Obtener todas las estrategias
router.get('/estrategias_ensenanza/:id', EstrategiaController.obtenerEstrategiaPorId); // Obtener estrategia por ID
router.get('/historial_recomendaciones/:id_estudiante', HistorialController.obtenerHistorialPorEstudiante); // Obtener historial de un estudiante

// Rutas POST
router.post('/estrategias_ensenanza', EstrategiaController.crearEstrategia); // Crear nueva estrategia
router.post('/historial_recomendaciones', HistorialController.registrarRecomendacion); // Registrar recomendación

module.exports = router;
