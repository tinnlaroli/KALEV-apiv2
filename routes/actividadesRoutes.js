const express = require('express');
const router = express.Router();
const ActividadController = require('../controllers/actividadesController');

// Obtener todas las actividades
router.get('/', ActividadController.obtenerTodas);

// Obtener una actividad por ID
router.get('/:id', ActividadController.obtenerPorId);

// Obtener actividades asignadas a un estudiante
router.get('/estudiante/:id_estudiante', ActividadController.obtenerPorEstudiante);

// Crear una nueva actividad
router.post('/', ActividadController.crear);

module.exports = router;
